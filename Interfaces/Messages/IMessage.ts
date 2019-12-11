export interface IMessage {
    id: number;
    title: string;
    message: string;
    image_url: string;
    date_time: Date;
    link: string;
    content_owner: string;

    getMessage();
}
