import type { Bot } from "../../bot.js";
/** Returns a guild widget settings object. Requires the MANAGE_GUILD permission. */
export declare function getWidgetSettings(bot: Bot, guildId: bigint): Promise<import("../../mod.js").GuildWidgetSettings>;
