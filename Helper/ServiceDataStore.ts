import {IMessage} from "../Interfaces/Messages/IMessage";

export class ServiceDataStore {
    private Name: string = "default";
    private MessageStore: IMessage[] = [];

    constructor(Name: string) {
        this.SetName(Name);
    }

    public SetName(Name: string): void {
        this.Name = Name;
    }

    public GetName(): string {
        return this.Name;
    }

    public Store(Message: IMessage): void {
        this.MessageStore.push(Message);
    }

    public IsStored(Message: IMessage): boolean {
        let Stored = false;

        for (let i = 0; i < this.MessageStore.length; i++) {
            if(this.MessageStore[i].getTitle() === Message.getTitle()) {
                Stored = true;
            }
        }

        return Stored;
    }
}
