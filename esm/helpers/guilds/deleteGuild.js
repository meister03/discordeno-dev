/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
export async function deleteGuild(bot, guildId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD(guildId));
}
