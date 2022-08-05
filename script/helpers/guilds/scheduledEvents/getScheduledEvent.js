"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduledEvent = void 0;
/** Get a guild scheduled event. */
async function getScheduledEvent(bot, guildId, eventId, options) {
    const event = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId, options?.withUserCount));
    if (!event?.id)
        return;
    return bot.transformers.scheduledEvent(bot, event);
}
exports.getScheduledEvent = getScheduledEvent;
