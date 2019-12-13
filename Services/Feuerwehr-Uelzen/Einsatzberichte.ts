import {IService} from "../../Interfaces/IService";

export class Einsatzberichte implements IService{
    name: string = "Feuerwehr Uelzen";
    current_count: number = 0;

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
        // https://feuerwehr-uelzen.de/einsaetze/feed/
    }
}
