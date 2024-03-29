import { requireBotChannelPermissions } from "../permissions.js";
export function addReaction(bot) {
    const addReactionOld = bot.helpers.addReaction;
    bot.helpers.addReaction = async function (channelId, messageId, reaction) {
        requireBotChannelPermissions(bot, channelId, [
            "READ_MESSAGE_HISTORY",
            "ADD_REACTIONS",
        ]);
        return await addReactionOld(channelId, messageId, reaction);
    };
}
export function addReactions(bot) {
    const addReactionsOld = bot.helpers.addReactions;
    bot.helpers.addReactions = async function (channelId, messageId, reactions, ordered) {
        requireBotChannelPermissions(bot, channelId, [
            "READ_MESSAGE_HISTORY",
            "ADD_REACTIONS",
        ]);
        return await addReactionsOld(channelId, messageId, reactions, ordered);
    };
}
export function removeReaction(bot) {
    const removeReactionOld = bot.helpers.removeReaction;
    bot.helpers.removeReaction = async function (channelId, messageId, reactions, options) {
        // IF REMOVING OTHER USER PERMS MANAGE MESSAGES IS REQUIRED
        if (options?.userId) {
            requireBotChannelPermissions(bot, channelId, [
                "MANAGE_MESSAGES",
            ]);
        }
        return await removeReactionOld(channelId, messageId, reactions, options);
    };
}
export function removeAllReactions(bot) {
    const removeAllReactionsOld = bot.helpers.removeAllReactions;
    bot.helpers.removeAllReactions = async function (channelId, messageId) {
        requireBotChannelPermissions(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await removeAllReactionsOld(channelId, messageId);
    };
}
export function removeReactionEmoji(bot) {
    const removeReactionEmojiOld = bot.helpers.removeReactionEmoji;
    bot.helpers.removeReactionEmoji = async function (channelId, messageId, reaction) {
        requireBotChannelPermissions(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await removeReactionEmojiOld(channelId, messageId, reaction);
    };
}
export default function setupReactionsPermChecks(bot) {
    addReaction(bot);
    addReactions(bot);
    removeReaction(bot);
    removeAllReactions(bot);
    removeReactionEmoji(bot);
}
