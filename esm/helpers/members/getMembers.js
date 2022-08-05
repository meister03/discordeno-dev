import { Collection } from "../../util/collection.js";
// TODO: make options optional
/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembers(bot, guildId, options) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_MEMBERS(guildId, options));
    return new Collection(result.map((res) => {
        const member = bot.transformers.member(bot, res, guildId, bot.transformers.snowflake(res.user.id));
        return [member.id, member];
    }));
}
