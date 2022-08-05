import { Bot } from "../../../bot.js";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.js";
import { DiscordScheduledEvent } from "../../../types/discord.js";
import { Collection } from "../../../util/collection.js";

/** Get a list of guild scheduled event for the given guild. */
export async function getScheduledEvents(bot: Bot, guildId: bigint, options?: GetScheduledEvents) {
  const events = await bot.rest.runMethod<DiscordScheduledEvent[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_SCHEDULED_EVENTS(guildId, options?.withUserCount),
  );

  return new Collection<bigint, ScheduledEvent>(
    events.map((e) => {
      const event = bot.transformers.scheduledEvent(bot, e);
      return [event.id, event];
    }),
  );
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}
