import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export declare function getIntegrations(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../mod.js").Integration>>;
