/** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
export async function getVanityUrl(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_VANITY_URL(guildId));
    return {
        uses: result.uses,
        code: result.code,
    };
}
