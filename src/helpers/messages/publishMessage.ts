import type { Bot } from "../../bot.js";
import { DiscordMessage } from "../../types/discord.js";

/** Crosspost a message in a News Channel to following channels. */
export async function publishMessage(bot: Bot, channelId: bigint, messageId: bigint) {
  const data = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId),
  );

  return bot.transformers.message(bot, data);
}
