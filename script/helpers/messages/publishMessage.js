"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMessage = void 0;
/** Crosspost a message in a News Channel to following channels. */
async function publishMessage(bot, channelId, messageId) {
    const data = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId));
    return bot.transformers.message(bot, data);
}
exports.publishMessage = publishMessage;
