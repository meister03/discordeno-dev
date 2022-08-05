/** Delete a message with the channel id and message id only. */
export async function deleteMessage(bot, channelId, messageId, reason, delayMilliseconds = 0) {
    if (delayMilliseconds)
        await bot.utils.delay(delayMilliseconds);
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId), { reason });
}
