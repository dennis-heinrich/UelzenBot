import {IMessage} from "./IMessage";

export class Message implements IMessage{
    id: number;
    date_time: Date;
    image_url: string;
    message: string;
    title: string;

    getMessage() {
    }

}
