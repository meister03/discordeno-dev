import { Bot } from "../../bot.js";
import { DiscordStickerPack } from "../../types/discord.js";

/** Returns the list of sticker packs available to Nitro subscribers. */
export async function nitroStickerPacks(bot: Bot) {
  const packs = await bot.rest.runMethod<DiscordStickerPack[]>(
    bot.rest,
    "GET",
    bot.constants.routes.NITRO_STICKER_PACKS(),
  );

  return packs.map((pack) => bot.transformers.stickerPack(bot, pack));
}
