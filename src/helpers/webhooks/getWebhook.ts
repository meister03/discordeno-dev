import type { Bot } from "../../bot.js";
import { DiscordWebhook } from "../../types/discord.js";

/** Returns the new webhook object for the given id. */
export async function getWebhook(bot: Bot, webhookId: bigint) {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK_ID(webhookId),
  );

  if (!result?.id) return;

  return bot.transformers.webhook(bot, result);
}
