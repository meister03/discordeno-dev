import { Collection } from "../../../util/collection.js";
export async function getScheduledEventUsers(bot, guildId, eventId, options) {
    let url = bot.constants.routes.GUILD_SCHEDULED_EVENT_USERS(guildId, eventId, options);
    if (options) {
        url = "?";
        if (options.limit)
            url += `limit=${options.limit}`;
        if (options.withMember)
            url += `&with_member=${options.withMember}`;
        if (options.after)
            url += `&after=${options.after}`;
        if (options.before)
            url += `&before=${options.before}`;
    }
    const result = await bot.rest.runMethod(bot.rest, "GET", url);
    if (!options?.withMember) {
        return new Collection(result.map((res) => {
            const user = bot.transformers.user(bot, res.user);
            return [user.id, user];
        }));
    }
    return new Collection(result.map((res) => {
        const user = bot.transformers.user(bot, res.user);
        const member = bot.transformers.member(bot, res.member, guildId, user.id);
        return [user.id, { member, user }];
    }));
}
