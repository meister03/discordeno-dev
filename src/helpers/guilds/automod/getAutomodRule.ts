import { Bot } from "../../../bot.js";
import { DiscordAutoModerationRule } from "../../../types/discord.js";
import { Collection } from "../../../util/collection.js";

/** Get a rule currently configured for guild. */
export async function getAutomodRule(bot: Bot, guildId: bigint, ruleId: bigint) {
  const rule = await bot.rest.runMethod<DiscordAutoModerationRule>(
    bot.rest,
    "GET",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
  );

  return bot.transformers.automodRule(bot, rule);
}
