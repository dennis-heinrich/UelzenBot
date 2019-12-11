import {IMessage} from "./IMessage";

export class Message implements IMessage{
    id: number;
    date_time: Date;
    image_url: string;
    message: string;
    title: string;
    link: string;
    content_owner: string;

    getMessage() {
        // Prevent to show links without credit the page owner
        if(this.content_owner === null) {
            return "<b>"+this.title+"</b>\n"+this.message;

        } else {
            if(this.link !== null) {
                return '*AZ-Online* | ['+this.title+']('+this.link+') | '+this.message;
            } else {
            }
        }

        return "";
    }

    addContentOwner(name: string) {
        this.content_owner = name;
    }
}
