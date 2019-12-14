import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";

const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("Moment");
const request = require("request");

export class Einsatzberichte implements IService{
    name: string = "Feuerwehr Uelzen";
    store: ServiceDataStore = new ServiceDataStore(this.name);
    current_count: number = 0;
    last_time: Date = Moment().toDate();
    _request: any = request;

    AddUpdatedMessage() {
        this.current_count += 1;
    }

    ClearUpdatedMessages() {
        this.current_count = 0;
    }

    GetUpdatedMessages() {
        return this.current_count;
    }

    public async UpdateServiceTick() : Promise<void> {
        return new Promise<void>(resolve => {
            let that = this;
            this._request(Configuration.Services.Einsatzberichte.ServiceFeedUrl).pipe(new FeedParser()).on('readable', function () {
                let stream = this, Post;
                while(Post = stream.read()) {
                    let NewMessage = new Message();
                    NewMessage.setCreationTime(Moment(Post.pubdate).toDate());
                    NewMessage.setTitle(Post.title.replace(' – – ',' - '));
                    NewMessage.setMessage("");
                    NewMessage.setImageUrl(null);
                    NewMessage.setWebLinkUrl(Post.link);
                    NewMessage.setContentOwner("Feuerwehr Uelzen - Einsatz");

                    if(!that.store.IsStored(NewMessage)) {
                        that.store.Store(NewMessage);
                        console.info(" * "+ that.name + ": " + NewMessage.getTitle() + " - " + NewMessage.getCreationTime().toLocaleString());
                        that.AddUpdatedMessage();
                        AllMessageSplitter.SplitMessage(NewMessage);
                    }
                }
            });

            that.last_time = Moment().toDate();
        });
    }
}
