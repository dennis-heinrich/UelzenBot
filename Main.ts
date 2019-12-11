import {AZ_Online} from "./Services/AZ-Online/AZ-Online";
import {IService} from "./Interfaces/IService";

export class Main {
    Services: IService[] = [];
    Telegram: any;

    constructor() {
        console.log("Telegram Service Subscriber - Uelzen Bot");
        this.RegisterService(new AZ_Online());
    }

    private RegisterService(Service: IService) {
        this.Services.push(Service);
    }

    public UpdateServices() {
        for (let i = 0; i < this.Services.length; i++) {
            this.Services[i].UpdateServiceTick();
        }
    }
}

let MainService = new Main();

setInterval(function () {
    MainService.UpdateServices();
}, 2000);
