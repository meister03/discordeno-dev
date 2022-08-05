/** Remove a role from the member */
export async function removeRole(bot, guildId, memberId, roleId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId), { reason });
}
