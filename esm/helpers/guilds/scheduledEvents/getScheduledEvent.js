/** Get a guild scheduled event. */
export async function getScheduledEvent(bot, guildId, eventId, options) {
    const event = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId, options?.withUserCount));
    if (!event?.id)
        return;
    return bot.transformers.scheduledEvent(bot, event);
}
