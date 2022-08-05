import type { Bot } from "../../bot.js";
/** Removes a reaction from the given user on this message, defaults to bot. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
export declare function removeReaction(bot: Bot, channelId: bigint, messageId: bigint, reaction: string, options?: {
    userId?: bigint;
}): Promise<void>;
