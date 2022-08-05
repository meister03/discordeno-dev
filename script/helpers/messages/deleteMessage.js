"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = void 0;
/** Delete a message with the channel id and message id only. */
async function deleteMessage(bot, channelId, messageId, reason, delayMilliseconds = 0) {
    if (delayMilliseconds)
        await bot.utils.delay(delayMilliseconds);
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId), { reason });
}
exports.deleteMessage = deleteMessage;
