/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. Bot needs MANAGE_THREADS permissions in the server if deleting thread. */
export async function deleteChannel(bot, channelId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL(channelId), {
        reason,
    });
}
