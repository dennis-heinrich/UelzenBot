import {IMessage} from "./IMessage";
const Moment = require("moment");
import 'moment/locale/de';

export class Message implements IMessage {
    private content_owner: string;
    private date_time: Date;
    private image_url: string;
    private link: string;
    private message: string;
    private title: string;

    constructor() {
        Moment().locale("de");
    }

    BuildMessage() {
        return Message.BuildMessageMarkdown(this);
    }

    static BuildMessageMarkdown(NMessage: IMessage) {
        if(NMessage.getTitle()) {
            if(NMessage.getContentOwner()) {
                if(NMessage.getWebLinkUrl()) {
                    if(NMessage.getMessage() == "") {
                        return "*" + NMessage.getContentOwner() + "*\n[" + NMessage.getTitle() + "]("+NMessage.getWebLinkUrl()+")\nVon: _"+Moment(NMessage.getCreationTime()).format('lll')+"_";
                    } else {
                        return "*" + NMessage.getContentOwner() + "*\n[" + NMessage.getTitle() + "]("+NMessage.getWebLinkUrl()+")\n" + NMessage.getMessage() + "\nVon: _"+Moment(NMessage.getCreationTime()).format('lll')+"_";
                    }
                } else {
                    return "*" + NMessage.getContentOwner() + "*\n*" + NMessage.getTitle() + "*\n" + NMessage.getMessage();
                }
            } else {
                return "*" + NMessage.getTitle() + "*\n" + NMessage.getMessage();
            }
        } else {
            return "*" + NMessage.getMessage() + "*";
        }
    }

    getContentOwner(): string {
        return this.content_owner;
    }

    getCreationTime(): Date {
        return this.date_time;
    }

    getImageUrl(): string {
        return this.image_url;
    }

    getMessage(): string {
        return this.message;
    }

    getTitle(): string {
        return this.title;
    }

    getWebLinkUrl(): string {
        return this.link;
    }

    setContentOwner(Owner: string) {
        this.content_owner = Owner;
    }

    setCreationTime(Datetime: Date) {
        this.date_time = Datetime;
    }

    setImageUrl(Url: string) {
        this.image_url = Url;
    }

    setMessage(Message: string) {
        this.message = Message;
    }

    setTitle(Title: string) {
        this.title = Title;
    }

    setWebLinkUrl(Url: string) {
        this.link = Url;
    }
}
