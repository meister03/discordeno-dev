import type { Bot } from "../../bot.js";
/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export declare function editWidget(bot: Bot, guildId: bigint, enabled: boolean, channelId?: string | null): Promise<import("../../mod.js").GuildWidgetSettings>;
