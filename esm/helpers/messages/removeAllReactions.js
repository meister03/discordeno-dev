/** Removes all reactions for all emojis on this message. */
export async function removeAllReactions(bot, channelId, messageId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_MESSAGE_REACTIONS(channelId, messageId));
}
