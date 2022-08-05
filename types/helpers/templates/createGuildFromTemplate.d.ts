import type { Bot } from "../../bot.js";
/**
 * Create a new guild based on a template
 * NOTE: This endpoint can be used only by bots in less than 10 guilds.
 */
export declare function createGuildFromTemplate(bot: Bot, templateCode: string, data: CreateGuildFromTemplate): Promise<import("../../mod.js").Guild>;
/** https://discord.com/developers/docs/resources/template#create-guild-from-template-json-params */
export interface CreateGuildFromTemplate {
    /** Name of the guild (2-100 characters) */
    name: string;
    /** base64 128x128 image for the guild icon */
    icon?: string;
}
