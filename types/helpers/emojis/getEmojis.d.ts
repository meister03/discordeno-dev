import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/**
 * Returns a list of emojis for the given guild.
 */
export declare function getEmojis(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../mod.js").Emoji>>;
