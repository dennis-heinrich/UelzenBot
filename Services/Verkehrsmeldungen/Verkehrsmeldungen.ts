import {IService} from "../../Interfaces/IService";
import {ServiceDataStore} from "../../Helper/ServiceDataStore";
const Configuration = require("../../Configuration");

export class Verkehrsmeldungen implements IService {
    current_count: number = 0;
    id: string = "verkehrsmeldungen_info";
    name: string = "Verkehrsmeldungen";
    store: ServiceDataStore = new ServiceDataStore(this.id);

    AddUpdatedMessage() {
        this.current_count += 1;
    }

    ClearUpdatedMessages() {
        this.current_count = 0;
    }

    GetUpdatedMessages() {
        return this.current_count;
    }

    UpdateServiceTick() {

    }

}
