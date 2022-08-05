/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export async function addDiscoverySubcategory(bot, guildId, categoryId) {
    await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId));
}
