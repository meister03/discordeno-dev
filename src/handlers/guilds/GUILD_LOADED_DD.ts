import type { Bot } from "../../bot.js";
import type { Guild } from "../../transformers/guild.js";
import { DiscordGatewayPayload, DiscordGuild } from "../../types/discord.js";

export function handleGuildLoaded(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild;

  const guild = bot.transformers.guild(bot, { guild: payload, shardId });
  bot.events.guildLoaded(bot, guild as Guild);
}
