import {IService} from "../../Interfaces/IService";
import {IMessage} from "../../Interfaces/Messages/IMessage";
import {Message} from "../../Interfaces/Messages/Message";

// Require statements
const FeedParser = require("feedparser");
const Moment = require("Moment");
const Telegram = require('telegraf/telegram');
const request = require("request");
const {JSDOM} = require("jsdom");

export class AZ_Online implements IService {
    last_time: Date = Moment().toDate();
    name: string = "AZ Online";

    _request: any = request;

     static async CreateMessage(Message: IMessage): Promise<void> {
        let TelegramC = new Telegram("1012885395:AAGb798lkuGY5hfPXkH0LMxZDa-DxGzNryE");

        // Try to fetch the article image
        if(Message.link !== null) {
            await JSDOM.fromURL(Message.link).then(dom => {
                TelegramC.sendPhoto(-1001266018619, dom.window.document.querySelector("img").src, {caption: Message.getMessage(), parse_mode: "Markdown"}).then(r => console.log(r));
            });
        } else {
            throw new Error("Keine Nachricht vorhanden!");
        }
    }

    private async GetServiceUrlData(): Promise<void> {
        return new Promise<void>(resolve => {
            let Telegraf = Telegram;
            let that = this;
            let Req = this._request("https://www.az-online.de/uelzen/rssfeed.rdf").pipe(new FeedParser()).on('readable', function () {
                let stream = this, Post;
                while(Post = stream.read()) {
                    let NewMessage = new Message();
                    NewMessage.date_time = Moment(Post.pubdate).toDate();
                    NewMessage.title = Post.title;
                    NewMessage.message = Post.description;
                    NewMessage.link = Post.link;
                    NewMessage.addContentOwner("AZ-Online");

                    if(Moment(NewMessage.date_time).isAfter(that.last_time)) {
                        //console.log(NewMessage);
                        AZ_Online.CreateMessage(NewMessage);
                    }
                }
            });

            that.last_time = Moment().toDate();
        });
    }

    public async UpdateServiceTick() {
        console.info("Service: " + this.name + " wird aktualisiert");
        await this.GetServiceUrlData();
    }
}

