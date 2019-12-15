import {IMessage} from "../../Interfaces/Messages/IMessage";
import {TelegramHelper} from "./Telegram";
import {DiscordHelper} from "./Discord";
const Configuration = require("../../Configuration");

export class AllMessageSplitter {
    public static async SplitMessage(NMessage: IMessage) : Promise<void> {
        if(Configuration.Telegram.Enabled) {
            await TelegramHelper.CreateTelegramMessage(NMessage);
        }

        if(Configuration.Discord.Enabled) {
            await DiscordHelper.CreateDiscordMessage(NMessage);
        }
    }
}
