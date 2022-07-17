/** Remove the ban for a user. Requires BAN_MEMBERS permission */
export async function unbanMember(bot, guildId, id) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_BAN(guildId, id));
}
