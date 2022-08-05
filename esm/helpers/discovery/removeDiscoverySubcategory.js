/** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
export async function removeDiscoverySubcategory(bot, guildId, categoryId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId));
}
