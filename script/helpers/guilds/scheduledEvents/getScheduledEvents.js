"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduledEvents = void 0;
const collection_js_1 = require("../../../util/collection.js");
/** Get a list of guild scheduled event for the given guild. */
async function getScheduledEvents(bot, guildId, options) {
    const events = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_SCHEDULED_EVENTS(guildId, options?.withUserCount));
    return new collection_js_1.Collection(events.map((e) => {
        const event = bot.transformers.scheduledEvent(bot, e);
        return [event.id, event];
    }));
}
exports.getScheduledEvents = getScheduledEvents;
