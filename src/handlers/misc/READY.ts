import { Bot } from "../../bot.js";
import { DiscordGatewayPayload, DiscordReady } from "../../types/discord.js";

export function handleReady(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordReady;
  // Triggered on each shard
  bot.events.ready(
    bot,
    {
      shardId,
      v: payload.v,
      user: bot.transformers.user(bot, payload.user),
      guilds: payload.guilds.map((p) => bot.transformers.snowflake(p.id)),
      sessionId: payload.session_id,
      shard: payload.shard,
      applicationId: bot.transformers.snowflake(payload.application.id),
    },
    payload,
  );

  if (!bot.id) bot.id = bot.transformers.snowflake(payload.user.id);
  if (!bot.applicationId) bot.applicationId = bot.transformers.snowflake(payload.application.id);
}
