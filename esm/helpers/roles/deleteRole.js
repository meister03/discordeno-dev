/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export async function deleteRole(bot, guildId, id) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_ROLE(guildId, id));
}
