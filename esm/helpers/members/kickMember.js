/** Kick a member from the server */
export async function kickMember(bot, guildId, memberId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_MEMBER(guildId, memberId), {
        reason,
    });
}
