/** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
import type { Bot } from "../../bot.js";
export declare function removeReactionEmoji(bot: Bot, channelId: bigint, messageId: bigint, reaction: string): Promise<void>;
