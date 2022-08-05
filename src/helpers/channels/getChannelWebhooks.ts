import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
import { DiscordWebhook } from "../../types/discord.js";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_WEBHOOKS(channelId),
  );

  return new Collection(result.map((hook) => {
    const webhook = bot.transformers.webhook(bot, hook);
    return [webhook.id, webhook];
  }));
}
