"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllReactions = void 0;
/** Removes all reactions for all emojis on this message. */
async function removeAllReactions(bot, channelId, messageId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_MESSAGE_REACTIONS(channelId, messageId));
}
exports.removeAllReactions = removeAllReactions;
