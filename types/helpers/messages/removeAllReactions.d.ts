import type { Bot } from "../../bot.js";
/** Removes all reactions for all emojis on this message. */
export declare function removeAllReactions(bot: Bot, channelId: bigint, messageId: bigint): Promise<void>;
