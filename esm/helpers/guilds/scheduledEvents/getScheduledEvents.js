import { Collection } from "../../../util/collection.js";
/** Get a list of guild scheduled event for the given guild. */
export async function getScheduledEvents(bot, guildId, options) {
    const events = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_SCHEDULED_EVENTS(guildId, options?.withUserCount));
    return new Collection(events.map((e) => {
        const event = bot.transformers.scheduledEvent(bot, e);
        return [event.id, event];
    }));
}
