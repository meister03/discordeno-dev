/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(bot, userId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.USER(userId));
    if (!result.id)
        return;
    return bot.transformers.user(bot, result);
}
