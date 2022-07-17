/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(bot, guildId, templateCode) {
    return await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode));
}
