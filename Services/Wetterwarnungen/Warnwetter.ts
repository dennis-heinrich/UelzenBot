import {IService} from "../../Interfaces/IService";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";
import {Message} from "../../Interfaces/Messages/Message";
import {AllMessageSplitter} from "../../Helper/Messenger/All";
import {ApplicationLogger} from "../../Helper/ApplicationLogger";
const Configuration = require("../../Configuration");

export class Warnwetter implements IService{
    id: string = "dwd_warnwetter";
    name: string = "Wetterwarnungen (DWD)";
    store: ServiceDataStore = new ServiceDataStore(this.id);
    _request: any = require("request");

    static ParseResultToJSON(Result: string): any {
        return JSON.parse(Result.replace("warnWetter.loadWarnings(", "").replace(");", ""));
    }

    async UpdateServiceTick() {
        let that = this;
        await this._request(Configuration.Services.DWD_Warnwetter.ServiceFeedUrl, async function (err, res, body) {
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

                            try {
                                await AllMessageSplitter.SplitMessage(NMessage).catch(function (reason) {
                                    ApplicationLogger.ServiceEntry(NMessage.getTitle(), NMessage.getMessage());
                                    that.store.StoreRollback(NMessage);
                                    console.error("Fehlermeldung: " + reason);
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
