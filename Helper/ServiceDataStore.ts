import {IMessage} from "../Interfaces/Messages/IMessage";
import {Message} from "../Interfaces/Messages/Message";

const FS = require('fs');
const Moment = require("moment");

export interface IServiceDataStore {
    Name: string;
    MessageStore: IMessage[];

    SetName(Name: string): void;
    GetName(): string;

    Store(Message: IMessage): void;
    IsStored(Message: IMessage): boolean;

    LoadPersist(Message: IMessage);
    SavePersist();
}

export class ServiceDataStore implements IServiceDataStore{
    Name: string = "default";
    MessageStore: IMessage[] = [];

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

    public SavePersist() {
        let Path = __dirname  + "/../../Data/"+this.GetName()+".json";
        FS.writeFile(Path, JSON.stringify(this.MessageStore), function (err) {
            if(err) throw err;
        });
    }

    public LoadPersist() {
        let that = this;
        let Path = __dirname + "/../../Data/"+this.GetName()+".json";
        if(FS.existsSync(Path)) {
            FS.readFile(Path,'utf8', function (err, Data) {
                if(err) throw err;

                let Object = JSON.parse(Data);
                for(let i = 0; i < Object.length; i++) {
                    let NMessage = new Message();
                    NMessage.setTitle(Object[i].title);
                    NMessage.setImageUrl(Object[i].image_url);
                    NMessage.setMessage(Object[i].message);
                    NMessage.setWebLinkUrl(Object[i].link);
                    NMessage.setContentOwner(Object[i].content_owner);
                    NMessage.setCreationTime(Moment(Object[i].date_time));
                    that.MessageStore.push(NMessage);
                }
            });
        }
    }
}
