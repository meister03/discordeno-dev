import type { Bot } from "../../bot.js";
import { DiscordGuildWidget } from "../../types/discord.js";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildWidget>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WIDGET_JSON(guildId),
  );

  return bot.transformers.widget(bot, result);
}
