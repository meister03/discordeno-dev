/** Crosspost a message in a News Channel to following channels. */
export async function publishMessage(bot, channelId, messageId) {
    const data = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId));
    return bot.transformers.message(bot, data);
}
