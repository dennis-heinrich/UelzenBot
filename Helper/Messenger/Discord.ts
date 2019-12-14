import {Message} from "../../Interfaces/Messages/Message";
import {IMessage} from "../../Interfaces/Messages/IMessage";

const Webhook = require("webhook-discord");
const Configuration = require("../../Configuration");
const Hook = new Webhook.Webhook(Configuration.Discord.WebHook);

export class DiscordHelper {
    public static async CreateDiscordMessage(NMessage: IMessage) : Promise<void> {
        return new Promise<void>(resolve => {
            if(Configuration.Discord.Enabled) {
                let WebhookMessage = new Webhook.MessageBuilder().setText(Message.BuildMessageMarkdown(NMessage));
                if(NMessage.getImageUrl() != null || NMessage.getImageUrl() != "" || NMessage.getImageUrl() != undefined) {
                    WebhookMessage = new Webhook.MessageBuilder().setText(Message.BuildMessageMarkdown(NMessage)).setImage(NMessage.getImageUrl());
                }
                WebhookMessage.setName(NMessage.getContentOwner());
                Hook.send(WebhookMessage).catch((error) => {
                    console.log(error);
                });
            }
        });
    }
}
