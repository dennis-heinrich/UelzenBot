import {IMessage} from "./Messages/IMessage";
import {ServiceDataStore} from "../Helper/ServiceDataStore";

export interface IService {
    id: string;
    name: string; // Name of the Service
    store: ServiceDataStore;

    // Called every cycle as service "broker"
    UpdateServiceTick();
}
