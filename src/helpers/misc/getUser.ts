import type { Bot } from "../../bot.js";
import { DiscordUser } from "../../types/discord.js";

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(bot: Bot, userId: bigint) {
  const result = await bot.rest.runMethod<DiscordUser>(bot.rest, "GET", bot.constants.routes.USER(userId));

  if (!result.id) return;

  return bot.transformers.user(bot, result);
}
