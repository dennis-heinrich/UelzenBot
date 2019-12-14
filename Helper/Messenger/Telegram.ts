import {IMessage} from "../../Interfaces/Messages/IMessage";
import {Message} from "../../Interfaces/Messages/Message";

const Telegram = require('telegraf/telegram');
const Configuration = require('../../Configuration');

export class TelegramHelper {
    public static async CreateTelegramMessage(NMessage: IMessage) : Promise<void> {
        return new Promise<void>(resolve => {
            if(Configuration.Telegram.Enabled) {
                let TelegramC = new Telegram(Configuration.Telegram.BotToken);

                // Has a thumbnail or not?
                if(NMessage.getImageUrl() != null) {
                    TelegramC.sendPhoto(Configuration.Telegram.ChatId, NMessage.getImageUrl(), {
                        caption: Message.BuildMessageMarkdown(NMessage),
                        parse_mode: "Markdown"
                    }).catch(function () {
                        console.log("Bad promise");
                    });
                } else {
                    TelegramC.sendMessage(Configuration.Telegram.ChatId, Message.BuildMessageMarkdown(NMessage), {
                        parse_mode: "Markdown"
                    }).catch(function () {
                        console.log("Bad promise");
                    });
                }
            }
        })
    }
}
