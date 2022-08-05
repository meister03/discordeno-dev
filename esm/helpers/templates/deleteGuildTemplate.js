/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(bot, guildId, templateCode) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode));
}
