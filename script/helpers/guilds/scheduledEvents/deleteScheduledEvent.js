"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScheduledEvent = void 0;
/** Delete a scheduled event. */
async function deleteScheduledEvent(bot, guildId, eventId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId));
}
exports.deleteScheduledEvent = deleteScheduledEvent;
