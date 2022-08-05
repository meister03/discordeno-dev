"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTyping = void 0;
/**
 * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
 * However, if a bot is responding to a command and expects the computation to take a few seconds,
 * this endpoint may be called to let the user know that the bot is processing their message.
 */
async function startTyping(bot, channelId) {
    await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_TYPING(channelId));
}
exports.startTyping = startTyping;
