import type { Bot } from "../../bot.js";
import { DiscordWebhook } from "../../types/discord.js";
import { Collection } from "../../util/collection.js";

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WEBHOOKS(guildId),
  );

  return new Collection(result.map((hook) => {
    const webhook = bot.transformers.webhook(bot, hook);
    return [webhook.id, webhook];
  }));
}
