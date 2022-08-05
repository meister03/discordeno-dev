import type { Bot } from "../../bot.js";
import { DiscordVoiceRegion } from "../../types/discord.js";
import { Collection } from "../../util/collection.js";

/** Returns an array of voice regions that can be used when creating servers. */
export async function getAvailableVoiceRegions(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordVoiceRegion[]>(
    bot.rest,
    "GET",
    bot.constants.routes.VOICE_REGIONS(),
  );

  return new Collection(
    result.map((region) => {
      const voiceRegion = bot.transformers.voiceRegion(bot, region);
      return [voiceRegion.id, voiceRegion];
    }),
  );
}
