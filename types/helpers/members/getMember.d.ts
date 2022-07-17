import type { Bot } from "../../bot.js";
/** Returns a guild member object for the specified user. */
export declare function getMember(bot: Bot, guildId: bigint, id: bigint): Promise<import("../../mod.js").Member | undefined>;
