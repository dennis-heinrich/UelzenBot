import {IMessage} from "./Messages/IMessage";

export interface IService {
    name: string; // Name of the Service
    current_count: number; // Times of updated in cycle

    // Updates for the counting in cycle
    AddUpdatedMessage();
    GetUpdatedMessages();
    ClearUpdatedMessages();

    // Called every cycle as service "broker"
    UpdateServiceTick();
}
