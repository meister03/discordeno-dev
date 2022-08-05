import type { Bot } from "../../../bot.js";
import { Collection } from "../../../util/collection.js";
/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
export declare function getApplicationCommandPermissions(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../../mod.js").ApplicationCommandPermission>>;
