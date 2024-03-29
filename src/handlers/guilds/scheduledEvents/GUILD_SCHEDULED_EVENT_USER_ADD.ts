import type { Bot } from "../../../bot.js";
import { DiscordGatewayPayload, DiscordScheduledEventUserAdd } from "../../../types/discord.js";

export function handleGuildScheduledEventUserAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordScheduledEventUserAdd;

  return bot.events.scheduledEventUserAdd(bot, {
    guildScheduledEventId: bot.transformers.snowflake(payload.guild_scheduled_event_id),
    userId: bot.transformers.snowflake(payload.user_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
