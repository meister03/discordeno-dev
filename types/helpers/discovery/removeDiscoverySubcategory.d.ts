import type { Bot } from "../../bot.js";
/** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
export declare function removeDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number): Promise<void>;
