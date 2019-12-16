import {IService} from "../../Interfaces/IService";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
const Configuration = require("../../Configuration");

export class Warnwetter implements IService{
    current_count: number = 0;
    id: string = "dwd_warnwetter";
    name: string = "Wetterwarnungen (DWD)";
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

    static ParseResultToJSON(Result: string): any {
        return JSON.parse(Result.replace("warnWetter.loadWarnings(", "").replace(");", ""));
    }

    async UpdateServiceTick() {
        let that = this;
        await this._request(Configuration.Services.DWD_Warnwetter.ServiceFeedUrl, function (err, res, body) {
            for(let i = 0; i < Configuration.Services.DWD_Warnwetter.CellWarningIds.length; i++) {
                let Ergebnisse: Array<any> = Warnwetter.ParseResultToJSON(body).warnings[Configuration.Services.DWD_Warnwetter.CellWarningIds[i]];
                if(Ergebnisse) {
                    // Daten stehen nicht bereits im Cache?
                    // Problematik, da die API keine ID der Nachrichten speichert
                    if(Ergebnisse.length != that.store.MessageStore.length) {
                        for(let ex = 0; ex < Ergebnisse.length; ex++) {
                            let NMessage = new Message();
                            NMessage.setContentOwner("Wetterinformation - DWD");
                            NMessage.setTitle(Ergebnisse[ex].headline + " (" + Ergebnisse[ex].regionName + ")");
                            NMessage.setMessage(Ergebnisse[ex].description);
                            NMessage.setCreationTime(new Date());
                            that.store.Store(NMessage);
                            that.AddUpdatedMessage();

                            try {
                                AllMessageSplitter.SplitMessage(NMessage).catch(function (reason) {
                                    that.store.StoreRollback(NMessage);
                                    console.error("Fehlermeldung: " + reason);
                                }).then(function () {
                                    console.log(NMessage);
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }
            }
        });
    }
}
