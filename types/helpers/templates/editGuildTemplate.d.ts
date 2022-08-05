import type { Bot } from "../../bot.js";
import { DiscordTemplate } from "../../types/discord.js";
/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
export declare function editGuildTemplate(bot: Bot, guildId: bigint, templateCode: string, data: ModifyGuildTemplate): Promise<DiscordTemplate>;
/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplate {
    /** Name of the template (1-100 characters) */
    name?: string;
    /** Description of the template (0-120 characters) */
    description?: string | null;
}
