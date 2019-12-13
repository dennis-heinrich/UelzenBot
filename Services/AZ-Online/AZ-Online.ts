import {IService} from "../../Interfaces/IService";
import {IMessage} from "../../Interfaces/Messages/IMessage";
import {Message} from "../../Interfaces/Messages/Message";

// Require statements
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

    static async CreateMessage(NMessage: IMessage): Promise<void> {
        // Try to fetch the article image
        if(NMessage.getWebLinkUrl() !== null) {
            await JSDOM.fromURL(NMessage.getWebLinkUrl()).then(dom => {
                NMessage.setImageUrl(dom.window.document.querySelector("img").src);
                Message.CreateStaticMessage(NMessage);
            });
        } else {
            throw new Error("Keine Nachricht vorhanden!");
        }
    }

    public async UpdateServiceTick() {
        return new Promise<void>(resolve => {
            let that = this;
            let Req = this._request("https://www.az-online.de/uelzen/rssfeed.rdf").pipe(new FeedParser()).on('readable', function () {
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
                        AZ_Online.CreateMessage(NewMessage);
                    }
                }
            });

            that.last_time = Moment().toDate();
        });
    }
}

