"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReactionEmoji = void 0;
async function removeReactionEmoji(bot, channelId, messageId, reaction) {
    if (reaction.startsWith("<:")) {
        reaction = reaction.substring(2, reaction.length - 1);
    }
    else if (reaction.startsWith("<a:")) {
        reaction = reaction.substring(3, reaction.length - 1);
    }
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction));
}
exports.removeReactionEmoji = removeReactionEmoji;
