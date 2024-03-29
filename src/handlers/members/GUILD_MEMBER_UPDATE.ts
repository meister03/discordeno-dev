import { Bot } from "../../bot.js";
import { DiscordGatewayPayload, DiscordGuildMemberUpdate } from "../../types/discord.js";

export async function handleGuildMemberUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildMemberUpdate;

  const user = bot.transformers.user(bot, payload.user);
  bot.events.guildMemberUpdate(
    bot,
    bot.transformers.member(bot, payload, bot.transformers.snowflake(payload.guild_id), user.id),
    user,
  );
}
