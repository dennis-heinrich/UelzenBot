import {IMessage} from "../../Interfaces/Messages/IMessage";
import {TelegramHelper} from "./Telegram";
import {DiscordHelper} from "./Discord";
const Configuration = require("../../Configuration");

export class AllMessageSplitter {
    public static async SplitMessage(NMessage: IMessage) : Promise<void> {
        if(Configuration.Telegram.Enabled && Configuration.Telegram.BotToken) {
            await TelegramHelper.CreateTelegramMessage(NMessage);
        } else if(Configuration.Telegram.Enabled) {
            console.error("Der Service Telegram wurde aktiviert, ist aber vom Parameter 'BotToken' abhängig.");
        }

        if(Configuration.Discord.Enabled && Configuration.Discord.WebHook) {
            await DiscordHelper.CreateDiscordMessage(NMessage);
        } else if(Configuration.Discord.Enabled) {
            console.error("Der Service Discord wurde aktiviert, ist aber vom Parameter 'WebHook' (URL) abhängig.");
        }
    }
}
