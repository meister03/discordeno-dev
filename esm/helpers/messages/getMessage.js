/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(bot, channelId, id) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_MESSAGE(channelId, id));
    // If the message does not exist
    if (!result?.id)
        return;
    return bot.transformers.message(bot, result);
}
