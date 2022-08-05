/** Get pinned messages in this channel. */
export async function getPins(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_PINS(channelId));
    return result.map((msg) => bot.transformers.message(bot, msg));
}
