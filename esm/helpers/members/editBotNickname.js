/** Edit the nickname of the bot in this guild */
export async function editBotNickname(bot, guildId, options) {
    const response = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.USER_NICK(guildId), options);
    if (!response?.nick)
        return;
    return response.nick;
}
