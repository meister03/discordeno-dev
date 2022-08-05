import type { Bot } from "../../bot.js";
import { DiscordTemplate } from "../../types/discord.js";
/** Creates a template for the guild. Requires the `MANAGE_GUILD` permission. */
export declare function createGuildTemplate(bot: Bot, guildId: bigint, data: CreateTemplate): Promise<DiscordTemplate>;
export interface CreateTemplate {
    /** Name which the template should have */
    name: string;
    /** Description of the template */
    description?: string;
}
