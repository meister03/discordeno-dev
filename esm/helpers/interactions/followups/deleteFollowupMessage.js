/** Deletes a followup message for an Interaction. Functions the same as delete webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export async function deleteFollowupMessage(bot, interactionToken, messageId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId));
}
