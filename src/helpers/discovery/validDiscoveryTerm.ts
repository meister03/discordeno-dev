import type { Bot } from "../../bot.js";
import { DiscordValidateDiscoverySearchTerm } from "../../types/discord.js";

export async function validDiscoveryTerm(bot: Bot, term: string) {
  const result = await bot.rest.runMethod<DiscordValidateDiscoverySearchTerm>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_VALID_TERM(term),
  );

  return result.valid;
}
