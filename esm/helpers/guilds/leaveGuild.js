/** Leave a guild */
export async function leaveGuild(bot, guildId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_LEAVE(guildId));
}
