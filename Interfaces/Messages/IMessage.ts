export interface IMessage {
    id: number;
    title: string;
    message: string;
    image_url: string;
    date_time: Date;

    getMessage();
}
