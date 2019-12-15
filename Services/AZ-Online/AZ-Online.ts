import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";

// Require statements
const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("moment");
const request = require("request");
const {JSDOM} = require("jsdom");

export class AZ_Online implements IService {
    id: string = "az_online";
    name: string = "AZ Online";
    store: ServiceDataStore = new ServiceDataStore(this.id);

    current_count: number = 0;
    _request: any = request;

    AddUpdatedMessage() {
        this.current_count += 1;
    }

    GetUpdatedMessages() {
        return this.current_count;
    }

    ClearUpdatedMessages() {
        this.current_count = 0;
    }

    public async UpdateServiceTick() {
        let that = this;
        this._request(Configuration.Services.AZ_Online.ServiceFeedUrl).pipe(new FeedParser()).on('readable', function () {
            let stream = this, Post;
            while(Post = stream.read()) {
                let NewMessage = new Message();
                NewMessage.setCreationTime(Moment(Post.pubdate).toDate());
                NewMessage.setTitle(Post.title);
                NewMessage.setMessage(Post.description);
                NewMessage.setWebLinkUrl(Post.link);
                NewMessage.setContentOwner("AZ-Online");

                //console.log(that.store.IsStored(NewMessage));
                if(!that.store.IsStored(NewMessage)) {
                    console.info(" * "+ that.name + ": " + NewMessage.getTitle());
                    that.store.Store(NewMessage);
                    that.AddUpdatedMessage();


                    JSDOM.fromURL(NewMessage.getWebLinkUrl()).then(dom => {
                        try {
                            let image = dom.window.document.querySelector("img");

                            if(dom.window.document.querySelector("img")) {
                                NewMessage.setImageUrl(image.src);
                                AllMessageSplitter.SplitMessage(NewMessage).catch(function (reason) {
                                    console.error("Fehlermeldung: " + reason);
                                    that.store.StoreRollback(NewMessage);
                                });
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    });
                }
            }
        });
    }
}

