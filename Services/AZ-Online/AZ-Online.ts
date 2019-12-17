import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";
import {ApplicationLogger} from "../../Helper/ApplicationLogger";

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
    _request: any = request;

    async UpdateServiceTick() {
        let that = this;
        await this._request(Configuration.Services.AZ_Online.ServiceFeedUrl).pipe(new FeedParser()).on('readable', function () {
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
                    ApplicationLogger.ServiceEntry(that.name, NewMessage.getTitle());
                    that.store.Store(NewMessage);

                    JSDOM.fromURL(NewMessage.getWebLinkUrl()).then(async dom => {
                        try {
                            let image = dom.window.document.querySelector("img");

                            if(dom.window.document.querySelector("img")) {
                                NewMessage.setImageUrl(image.src);
                                await AllMessageSplitter.SplitMessage(NewMessage).catch(function (reason) {
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

