import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/** Returns a list of role objects for the guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
 */
export declare function getRoles(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../mod.js").Role>>;
