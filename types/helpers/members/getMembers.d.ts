import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export declare function getMembers(bot: Bot, guildId: bigint, options: ListGuildMembers): Promise<Collection<bigint, import("../../mod.js").Member>>;
/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
    /** Max number of members to return (1-1000). Default: 1000 */
    limit?: number;
    /** The highest user id in the previous page. Default: 0 */
    after?: string;
}
