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

    LoadPersist(Message: IMessage): Promise<void>;
    SavePersist(): Promise<void>;
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

    public SavePersist(): Promise<void> {
        return new Promise(resolve => {
            let FolderData = __dirname  + "/../Data/";
            let Folder = __dirname  + "/../Data/Store/";
            let Path = Folder+this.GetName()+".json";

            !FS.existsSync(FolderData) && FS.mkdirSync(FolderData);
            !FS.existsSync(Folder) && FS.mkdirSync(Folder);

            FS.writeFile(Path, JSON.stringify(this.MessageStore), 'utf8', function (err) {
                if(err) {
                    console.log(" ! * ! Fehler beim schreiben des Data-Stores ! * !");
                    return console.log(err);
                }
            });
        });
    }

    public LoadPersist(): Promise<void> {
        return new Promise(resolve => {
            let that = this;
            let Folder = __dirname  + "/../Data/Store/";
            let Path = Folder+this.GetName()+".json";

            if(FS.existsSync(Path)) {
                FS.readFile(Path,'utf8', function (err, Data) {
                    if(err) {
                        console.log(" ! * ! Fehler beim lesen des Data-Stores ! * !");
                        return console.log(err);
                    }

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
        });
    }
}
