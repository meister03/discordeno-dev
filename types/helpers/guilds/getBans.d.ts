import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
import { User } from "../../transformers/member.js";
/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export declare function getBans(bot: Bot, guildId: bigint, options?: GetBans): Promise<Collection<bigint, {
    reason?: string | undefined;
    user: User;
}>>;
export interface GetBans {
    /** Number of users to return (up to maximum 1000). Default: 1000 */
    limit?: number;
    /** Consider only users before given user id */
    before?: bigint;
    /** Consider only users after given user id */
    after?: bigint;
}
