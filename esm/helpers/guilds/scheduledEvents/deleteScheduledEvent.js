/** Delete a scheduled event. */
export async function deleteScheduledEvent(bot, guildId, eventId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId));
}
