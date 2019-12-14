import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/All";
import {IMessage} from "../../Interfaces/Messages/IMessage";

// Require statements
const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("Moment");
const request = require("request");
const {JSDOM} = require("jsdom");

class AZ_OnlineStore {
    private MessageStore: IMessage[] = [];

    public Store(Message: IMessage) {
        this.MessageStore.push(Message);
    }

    public IsStored(Message: IMessage) {
        let Stored = false;

        for (let i = 0; i < this.MessageStore.length; i++) {
            if(this.MessageStore[i].getTitle() === Message.getTitle()) {
                Stored = true;
            }
        }

        return Stored;
    }
}

export class AZ_Online implements IService {
    name: string = "AZ Online";
    store: AZ_OnlineStore = new AZ_OnlineStore();

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
                    console.log(NewMessage.getTitle());
                    that.store.Store(NewMessage);
                    that.AddUpdatedMessage();


                    JSDOM.fromURL(NewMessage.getWebLinkUrl()).then(dom => {
                        try {
                            let image = dom.window.document.querySelector("img");

                            if(dom.window.document.querySelector("img")) {
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

