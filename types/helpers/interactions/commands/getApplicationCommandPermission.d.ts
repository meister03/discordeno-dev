import type { Bot } from "../../../bot.js";
/** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
export declare function getApplicationCommandPermission(bot: Bot, guildId: bigint, commandId: bigint): Promise<import("../../../mod.js").ApplicationCommandPermission>;
