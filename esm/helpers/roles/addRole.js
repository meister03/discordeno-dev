/** Add a role to the member */
export async function addRole(bot, guildId, memberId, roleId, reason) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId), { reason });
}
