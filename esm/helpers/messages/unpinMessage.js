export async function unpinMessage(bot, channelId, messageId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_PIN(channelId, messageId));
}
