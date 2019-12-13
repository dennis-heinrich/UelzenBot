import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";

const FeedParser = require("feedparser");
const Moment = require("Moment");
const request = require("request");

export class Einsatzberichte implements IService{
    name: string = "Feuerwehr Uelzen";
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

    public async UpdateServiceTick() {
        return new Promise<void>(resolve => {
            let that = this;
            let Req = this._request("https://feuerwehr-uelzen.de/einsaetze/feed/").pipe(new FeedParser()).on('readable', function () {
                let stream = this, Post;
                while(Post = stream.read()) {
                    let NewMessage = new Message();
                    NewMessage.setCreationTime(Moment(Post.pubdate).toDate());
                    NewMessage.setTitle(Post.title);
                    NewMessage.setMessage(Post.description);
                    NewMessage.setWebLinkUrl(Post.link);
                    NewMessage.setContentOwner("Feuerwehr Uelzen");

                    if(Moment(NewMessage.getCreationTime()).isAfter(that.last_time)) {
                        that.AddUpdatedMessage();
                        Message.BuildMessageMarkdown(NewMessage);
                    }
                }
            });

            that.last_time = Moment().toDate();
        });
    }
}
