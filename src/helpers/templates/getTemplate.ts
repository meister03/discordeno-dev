import type { Bot } from "../../bot.js";
import { DiscordTemplate } from "../../types/discord.js";

/** Returns the guild template if it exists */
export async function getTemplate(bot: Bot, templateCode: string) {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "GET",
    bot.constants.routes.TEMPLATE(templateCode),
  );

  return bot.transformers.template(bot, result);
}
