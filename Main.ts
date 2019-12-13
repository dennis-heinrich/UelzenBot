import {AZ_Online} from "./Services/AZ-Online/AZ-Online";
import {IService} from "./Interfaces/IService";
import {Einsatzberichte} from "./Services/Feuerwehr-Uelzen/Einsatzberichte";

const Moment = require("moment");

export class Main {
    Services: IService[] = [];
    Telegram: any;

    constructor() {
        console.log("Telegram Service Subscriber - Uelzen Bot");
        this.RegisterService(new AZ_Online());
        this.RegisterService(new Einsatzberichte());
    }

    private RegisterService(Service: IService) {
        this.Services.push(Service);
    }

    public UpdateServices() {
        console.info("Neuer Abfragezyklus: " + Moment().toLocaleString());
        for (let i = 0; i < this.Services.length; i++) {
            this.Services[i].UpdateServiceTick();
            console.info(" - Service: " + this.Services[i].name + " wird aktualisiert ("+this.Services[i].GetUpdatedMessages()+")");
            this.Services[i].ClearUpdatedMessages();
        }
    }
}

let MainService = new Main();

setInterval(function () {
    MainService.UpdateServices();
}, 2000);
