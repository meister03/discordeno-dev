/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function deleteChannelOverwrite(bot, channelId, overwriteId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwriteId));
}
