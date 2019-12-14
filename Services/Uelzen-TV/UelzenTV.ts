import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";

const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("moment");
const Request = require("request");
const {JSDOM} = require("jsdom");

export class UelzenTV implements IService {
    id: string = "uelzen_tv";
    name: string = "Uelzen-TV";
    store: ServiceDataStore = new ServiceDataStore(this.id);
    current_count: number = 0;
    _request: any = Request;

    AddUpdatedMessage() {
        this.current_count += 1;
    }

    ClearUpdatedMessages() {
        this.current_count = 0;
    }

    GetUpdatedMessages() {
        return this.current_count;
    }

    public UpdateServiceTick() {
        let that = this;
        this._request(Configuration.Services.UelzenTV.ServiceFeedUrl).pipe(new FeedParser()).on('readable', function () {
            let stream = this, Post;
            while(Post = stream.read()) {
                let NewMessage = new Message();
                NewMessage.setCreationTime(Moment(Post.pubdate).toDate());
                NewMessage.setTitle(Post.title);
                NewMessage.setMessage("");
                NewMessage.setWebLinkUrl(Post.link);
                NewMessage.setContentOwner("Uelzen TV");

                //console.log(that.store.IsStored(NewMessage));
                if(!that.store.IsStored(NewMessage)) {
                    console.info(" * "+ that.name + ": " + NewMessage.getTitle());
                    that.store.Store(NewMessage);
                    that.AddUpdatedMessage();

                    JSDOM.fromURL(NewMessage.getWebLinkUrl()).then(dom => {
                        try {
                            let image = dom.window.document.querySelector("article p img");

                            if(image) {
                                NewMessage.setImageUrl(image.src);
                                AllMessageSplitter.SplitMessage(NewMessage);
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
