import type { Bot } from "../../bot.js";
/** Returns the Welcome Screen object for the guild. Requires the `MANAGE_GUILD` permission. */
export declare function getWelcomeScreen(bot: Bot, guildId: bigint): Promise<import("../../mod.js").WelcomeScreen>;
