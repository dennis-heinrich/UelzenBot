import {IService} from "../../Interfaces/IService";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {Message} from "../../Interfaces/Messages/Message";
const Configuration = require("../../Configuration");
const {JSDOM} = require("jsdom");
const utf8 = require('utf8');

export class Verkehrsmeldungen implements IService {
    current_count: number = 0;
    id: string = "verkehrsmeldungen";
    name: string = "Verkehrsmeldungen";
    store: ServiceDataStore = new ServiceDataStore(this.id);
    _request: any = require("request");

    AddUpdatedMessage() {
        this.current_count += 1;
    }

    ClearUpdatedMessages() {
        this.current_count = 0;
    }

    GetUpdatedMessages() {
        return this.current_count;
    }

    async UpdateServiceTick() {
        let that = this;
        this._request(Configuration.Services.Verkehrsmeldungen.ServiceFeedUrl, function (err, res, body) {
            let dom = JSDOM.fragment(body);
            let Query = dom.querySelectorAll("div.panel-body ul li .message");
            for (let i = 0; i < Query.length; i++) {
                let ReportHeader = Query[i].children[0].innerHTML;
                let ReportMessage = Query[i].children[2].innerHTML;

                let NMessage = new Message();
                NMessage.setContentOwner(that.name);
                NMessage.setTitle(ReportHeader);
                NMessage.setMessage(ReportMessage);
                NMessage.setCreationTime(new Date());

                if(!that.store.IsStored(NMessage) && NMessage.getTitle().includes("Uelzen")) {
                    console.info(" * "+ that.name + ": " + NMessage.getTitle());
                    that.store.Store(NMessage);
                    AllMessageSplitter.SplitMessage(NMessage).catch(reason => {
                        console.log(reason);
                    })
                }
            }
        });
    }
}
