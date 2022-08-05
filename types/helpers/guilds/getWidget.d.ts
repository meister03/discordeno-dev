import type { Bot } from "../../bot.js";
/** Returns the widget for the guild. */
export declare function getWidget(bot: Bot, guildId: bigint): Promise<import("../../mod.js").GuildWidget>;
