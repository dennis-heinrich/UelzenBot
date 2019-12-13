export interface IMessage {
    getTitle() : string;
    getMessage() : string;
    getImageUrl() : string;
    getCreationTime() : Date;
    getWebLinkUrl() : string;
    getContentOwner() : string;

    setTitle(Title: string);
    setMessage(Message: string);
    setImageUrl(Url: string);
    setCreationTime(Datetime: Date);
    setWebLinkUrl(Url: string);
    setContentOwner(Owner: string);

    BuildMessage();
}
