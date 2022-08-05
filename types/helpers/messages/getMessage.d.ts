import type { Bot } from "../../bot.js";
/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export declare function getMessage(bot: Bot, channelId: bigint, id: bigint): Promise<import("../../mod.js").Message | undefined>;
