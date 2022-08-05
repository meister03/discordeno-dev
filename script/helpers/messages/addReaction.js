"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReaction = void 0;
/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
async function addReaction(bot, channelId, messageId, reaction) {
    if (reaction.startsWith("<:")) {
        reaction = reaction.substring(2, reaction.length - 1);
    }
    else if (reaction.startsWith("<a:")) {
        reaction = reaction.substring(3, reaction.length - 1);
    }
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.CHANNEL_MESSAGE_REACTION_ME(channelId, messageId, reaction), {});
}
exports.addReaction = addReaction;
