"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactions = void 0;
/** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
async function addReactions(bot, channelId, messageId, reactions, ordered = false) {
    if (!ordered) {
        await Promise.all(reactions.map((reaction) => bot.helpers.addReaction(channelId, messageId, reaction)));
    }
    else {
        for (const reaction of reactions) {
            bot.events.debug("Running for of loop in addReactions function.");
            await bot.helpers.addReaction(channelId, messageId, reaction);
        }
    }
}
exports.addReactions = addReactions;
