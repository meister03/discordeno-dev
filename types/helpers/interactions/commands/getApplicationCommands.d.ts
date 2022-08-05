import { Collection } from "../../../util/collection.js";
import type { Bot } from "../../../bot.js";
/** Fetch all the commands for your application. If a guild id is not provided, it will fetch global commands. */
export declare function getApplicationCommands(bot: Bot, guildId?: bigint): Promise<Collection<bigint, import("../../../mod.js").ApplicationCommand>>;
