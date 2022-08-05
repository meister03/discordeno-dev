import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export declare function getVoiceRegions(bot: Bot, guildId: bigint): Promise<Collection<string, import("../../mod.js").VoiceRegions>>;
