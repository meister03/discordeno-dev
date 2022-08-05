import type { Bot } from "../../bot.js";
import { DiscordGuildWidgetSettings } from "../../types/discord.js";

/** Returns a guild widget settings object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildWidgetSettings>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WIDGET(guildId),
  );

  return bot.transformers.widgetSettings(bot, result);
}
