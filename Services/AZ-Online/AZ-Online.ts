import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/All";

// Require statements
const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("Moment");
const request = require("request");
const {JSDOM} = require("jsdom");

export class AZ_Online implements IService {
    name: string = "AZ Online";
    current_count: number = 0;
    last_time: Date = Moment().toDate();
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

    public async UpdateServiceTick() : Promise<void> {
        return new Promise<void>(resolve => {
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

                    if(Moment(NewMessage.getCreationTime()).isAfter(that.last_time)) {
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

            that.last_time = Moment().toDate();
        });
    }
}

