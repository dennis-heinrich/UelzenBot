import {IService} from "../../Interfaces/IService";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";
import {ApplicationLogger} from "../../Helper/ApplicationLogger";

// Require statements
const Configuration = require("../../Configuration");
const FeedParser = require("feedparser");
const Moment = require("moment");
const Request = require("request");

export class HansestadtUelzen implements IService {
    id: string = "hansestadt_uelzen";
    name: string = "Hansestadt Uelzen";
    store: ServiceDataStore = new ServiceDataStore(this.id);

    current_count: number = 0;
    _request: any = Request;

    AddUpdatedMessage() {
        this.current_count += 1;
    }

    GetUpdatedMessages() {
        return this.current_count;
    }

    ClearUpdatedMessages() {
        this.current_count = 0;
    }

    async UpdateServiceTick() {
        let that = this;
        await this._request(Configuration.Services.Hansestadt_Uelzen.ServiceFeedUrl).pipe(new FeedParser()).on('readable', async function () {
            let stream = this, Post;
            while(Post = stream.read()) {
                let NewMessage = new Message();
                NewMessage.setCreationTime(Moment().toDate());
                NewMessage.setTitle(Post.title);
                NewMessage.setWebLinkUrl(Post.link);
                NewMessage.setMessage("");
                NewMessage.setContentOwner(that.name);

                if(!that.store.IsStored(NewMessage)) {
                    ApplicationLogger.ServiceEntry(that.name, NewMessage.getTitle());
                    that.store.Store(NewMessage);
                    await AllMessageSplitter.SplitMessage(NewMessage).catch(function (reason) {
                        console.error("Fehlermeldung: " + reason);
                        that.store.StoreRollback(NewMessage);
                    });
                    that.AddUpdatedMessage();
                }
            }
        });
    }
}
