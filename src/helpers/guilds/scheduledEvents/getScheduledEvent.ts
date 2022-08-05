import { Bot } from "../../../bot.js";
import { DiscordScheduledEvent } from "../../../types/discord.js";

/** Get a guild scheduled event. */
export async function getScheduledEvent(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: { withUserCount?: boolean },
) {
  const event = await bot.rest.runMethod<DiscordScheduledEvent>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId, options?.withUserCount),
  );

  if (!event?.id) return;

  return bot.transformers.scheduledEvent(bot, event);
}
