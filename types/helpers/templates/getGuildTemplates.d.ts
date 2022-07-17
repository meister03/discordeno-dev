import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Returns an array of templates. Requires the `MANAGE_GUILD` permission. */
export declare function getGuildTemplates(bot: Bot, guildId: bigint): Promise<Collection<string, import("../../mod.js").Template>>;
