import type { SearchMembers } from "../../types/discordeno.js";
import { Collection } from "../../util/collection.js";
import { Bot } from "../../bot.js";
/**
 * Query string to match username(s) and nickname(s) against
 */
export declare function searchMembers(bot: Bot, guildId: bigint, query: string, options?: Omit<SearchMembers, "query">): Promise<Collection<bigint, import("../../mod.js").Member>>;
