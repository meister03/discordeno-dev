/** Returns a guild member object for the specified user. */
export async function getMember(bot, guildId, id) {
    const data = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_MEMBER(guildId, id));
    if (!data?.user.id)
        return;
    return bot.transformers.member(bot, data, guildId, id);
}
