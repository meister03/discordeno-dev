import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
import { DiscordDiscoveryCategory } from "../../types/discord.js";

/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
export async function getDiscoveryCategories(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordDiscoveryCategory[]>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_CATEGORIES(),
  );

  return new Collection<number, DiscordDiscoveryCategory>(
    result.map((category) => [category.id, category]),
  );
}
