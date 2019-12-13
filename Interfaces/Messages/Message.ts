import {IMessage} from "./IMessage";
const Telegram = require('telegraf/telegram');

export class Message implements IMessage {
    private content_owner: string;
    private date_time: Date;
    private image_url: string;
    private link: string;
    private message: string;
    private title: string;

    BuildMessage() {
        return Message.BuildMessageMarkdown(this);
    }

    static BuildMessageMarkdown(NMessage: IMessage) {
        if(NMessage.getTitle()) {
            if(NMessage.getContentOwner()) {
                if(NMessage.getWebLinkUrl()) {
                    return NMessage.getContentOwner() + " | *[" + NMessage.getTitle() + "]("+NMessage.getWebLinkUrl()+") *\n" + NMessage.getMessage();
                } else {
                    return NMessage.getContentOwner() + " | *" + NMessage.getTitle() + "*\n" + NMessage.getMessage();
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

    public static CreateStaticMessage(NMessage: IMessage) {
        let TelegramC = new Telegram("1012885395:AAGb798lkuGY5hfPXkH0LMxZDa-DxGzNryE");
        if(NMessage.getImageUrl() !== null) {
            TelegramC.sendPhoto(-1001266018619, NMessage.getImageUrl(), { caption: Message.BuildMessageMarkdown(NMessage), parse_mode: "Markdown" }).then(r => console.log(r));
        } else {
            TelegramC.sendMessage(-1001266018619, Message.BuildMessageMarkdown(NMessage), { parse_mode: "Markdown" }).then(r => console.log(r));
        }
        console.info("Neue Nachricht erstellt: Telegram");
    }
}
