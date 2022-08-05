import type { Bot } from "../../bot.js";
/**
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 */
export declare function getGuild(bot: Bot, guildId: bigint, options?: {
    counts?: boolean;
}): Promise<import("../../mod.js").Guild | undefined>;
