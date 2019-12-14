import {IMessage} from "../../Interfaces/Messages/IMessage";
import {TelegramHelper} from "./Telegram";
import {DiscordHelper} from "./Discord";

export class AllMessageSplitter {
    public static async SplitMessage(NMessage: IMessage) : Promise<void> {
        await TelegramHelper.CreateTelegramMessage(NMessage);
        await DiscordHelper.CreateDiscordMessage(NMessage);
    }
}
