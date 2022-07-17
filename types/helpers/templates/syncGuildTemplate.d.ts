import type { Bot } from "../../bot.js";
import { DiscordTemplate } from "../../types/discord.js";
/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export declare function syncGuildTemplate(bot: Bot, guildId: bigint, templateCode: string): Promise<DiscordTemplate>;
