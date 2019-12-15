import {IMessage} from "./Messages/IMessage";
import {ServiceDataStore} from "../Helper/ServiceDataStore";

export interface IService {
    id: string;
    name: string; // Name of the Service
    current_count: number; // Times of updated in cycle
    store: ServiceDataStore;

    // Updates for the counting in cycle
    AddUpdatedMessage() : void;
    GetUpdatedMessages() : number;
    ClearUpdatedMessages() : void;

    // Called every cycle as service "broker"
    UpdateServiceTick();
}
