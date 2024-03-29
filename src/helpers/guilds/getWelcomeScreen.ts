import type { Bot } from "../../bot.js";
import { DiscordWelcomeScreen } from "../../types/discord.js";

/** Returns the Welcome Screen object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getWelcomeScreen(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordWelcomeScreen>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WELCOME_SCREEN(guildId),
  );

  return bot.transformers.welcomeScreen(bot, result);
}
