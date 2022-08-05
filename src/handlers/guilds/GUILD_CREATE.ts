import type { Bot } from "../../bot.js";
import type { Guild } from "../../transformers/guild.js";
import { DiscordGatewayPayload, DiscordGuild } from "../../types/discord.js";

export function handleGuildCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild;
  bot.events.guildCreate(bot, bot.transformers.guild(bot, { guild: payload, shardId }) as Guild);
}
