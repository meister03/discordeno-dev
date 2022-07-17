import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Returns a list of guild channel objects. */
export declare function getChannels(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../mod.js").Channel>>;
