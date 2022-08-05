/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function banMember(bot, guildId, id, options) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.GUILD_BAN(guildId, id), options
        ? {
            delete_message_days: options.deleteMessageDays,
            reason: options.reason,
        }
        : {});
}
