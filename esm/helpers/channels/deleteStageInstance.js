/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function deleteStageInstance(bot, channelId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.STAGE_INSTANCE(channelId));
}
