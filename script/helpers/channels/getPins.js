"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPins = void 0;
/** Get pinned messages in this channel. */
async function getPins(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_PINS(channelId));
    return result.map((msg) => bot.transformers.message(bot, msg));
}
exports.getPins = getPins;
