import {IService} from "../../Interfaces/IService";
import {IMessage} from "../../Interfaces/Messages/IMessage";
import {Message} from "../../Interfaces/Messages/Message";
const FeedParser = require("feedparser");

export class AZ_Online implements IService {
    last_time: Date = new Date();
    name: string = "AZ Online";

    _feedParser: any;
    _request: any = require("request");

    /**
     * Updates
     * @constructor
     */
    private async GetServiceUrlData(): Promise<void> {
        return new Promise<void>(resolve => {
            let that = this;
            let Req = this._request("https://www.az-online.de/uelzen/rssfeed.rdf");
            that._feedParser = new FeedParser();


            Req.on('response', function(res) {
                res.pipe(that._feedParser);
            });

            that._feedParser.on('readable', function() {
                let Post;
                while (Post = this.read()) {
                    let NewMessage = new Message();
                    NewMessage.date_time = new Date();
                    NewMessage.title = Post.meta.title;
                    NewMessage.message = Post.description;

                    if(that.last_time > NewMessage.date_time) {
                        console.log(NewMessage);
                    }
                }
            });

            that.last_time = new Date();
        });
    }

    /**
     * Updates the service due to limits of the web-service
     */
    async UpdateServiceTick() {
        console.info("Service: " + this.name + " wird aktualisiert");

        await this.GetServiceUrlData();
    }
}

