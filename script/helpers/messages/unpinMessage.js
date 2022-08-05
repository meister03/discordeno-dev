"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpinMessage = void 0;
async function unpinMessage(bot, channelId, messageId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_PIN(channelId, messageId));
}
exports.unpinMessage = unpinMessage;
