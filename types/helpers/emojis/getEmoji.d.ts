import type { Bot } from "../../bot.js";
/**
 * Returns an emoji for the given guild and emoji Id.
 */
export declare function getEmoji(bot: Bot, guildId: bigint, emojiId: bigint): Promise<import("../../mod.js").Emoji>;
