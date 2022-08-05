import { Collection } from "../../util/collection.js";
/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(bot, guildId, options) {
    const results = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_BANS(guildId, options));
    return new Collection(results.map((res) => [
        bot.transformers.snowflake(res.user.id),
        {
            reason: res.reason ?? undefined,
            user: bot.transformers.user(bot, res.user),
        },
    ]));
}
