"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nitroStickerPacks = void 0;
/** Returns the list of sticker packs available to Nitro subscribers. */
async function nitroStickerPacks(bot) {
    const packs = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.NITRO_STICKER_PACKS());
    return packs.map((pack) => bot.transformers.stickerPack(bot, pack));
}
exports.nitroStickerPacks = nitroStickerPacks;
