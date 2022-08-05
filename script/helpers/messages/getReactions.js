"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReactions = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Get a list of users that reacted with this emoji. */
async function getReactions(bot, channelId, messageId, reaction, options) {
    if (reaction.startsWith("<:")) {
        reaction = reaction.substring(2, reaction.length - 1);
    }
    else if (reaction.startsWith("<a:")) {
        reaction = reaction.substring(3, reaction.length - 1);
    }
    const users = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, encodeURIComponent(reaction), options));
    return new collection_js_1.Collection(users.map((u) => {
        const user = bot.transformers.user(bot, u);
        return [user.id, user];
    }));
}
exports.getReactions = getReactions;
