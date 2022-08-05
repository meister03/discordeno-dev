import type { Bot } from "../../bot.js";
import { DiscordAddGuildDiscoverySubcategory } from "../../types/discord.js";

/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export async function addDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number) {
  await bot.rest.runMethod<DiscordAddGuildDiscoverySubcategory>(
    bot.rest,
    "POST",
    bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId),
  );
}
