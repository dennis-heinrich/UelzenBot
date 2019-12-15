import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";

const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("moment");
const request = require("request");

export class Einsatzberichte implements IService {
    id: string = "feuerwehr_uelzen";
    name: string = "Feuerwehr Uelzen";
    store: ServiceDataStore = new ServiceDataStore(this.id);
    current_count: number = 0;
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

    public UpdateServiceTick()  {
        let that = this;
        this._request(Configuration.Services.FF_UE_Einsatzberichte.ServiceFeedUrl).pipe(new FeedParser()).on('readable', function () {
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
                    AllMessageSplitter.SplitMessage(NewMessage).catch(function (reason) {
                        console.error("Fehlermeldung: " + reason);
                        that.store.StoreRollback(NewMessage);
                    });
                }
            }
        });
    }
}
