/** Create an emoji in the server */
export async function createEmoji(bot, guildId, options) {
    if (options.image && !options.image.startsWith("data:image/")) {
        options.image = await bot.utils.urlToBase64(options.image);
    }
    const emoji = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.GUILD_EMOJIS(guildId), {
        name: options.name,
        image: options.image,
        roles: options.roles?.map((role) => role.toString()),
        reason: options.reason,
    });
    return bot.transformers.emoji(bot, emoji);
}
