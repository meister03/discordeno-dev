import { Collection } from "../../util/collection.js";
/**
 * Query string to match username(s) and nickname(s) against
 */
export async function searchMembers(bot, guildId, query, options) {
    if (options?.limit) {
        if (options.limit < 1)
            throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_LOW);
        if (options.limit > 1000) {
            throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH);
        }
    }
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_MEMBERS_SEARCH(guildId, query, options));
    return new Collection(result.map((member) => {
        const m = bot.transformers.member(bot, member, guildId, bot.transformers.snowflake(member.user.id));
        return [m.id, m];
    }));
}
