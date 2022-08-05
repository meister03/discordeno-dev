/** To delete your response to a application command. If a message id is not provided, it will default to deleting the original response. */
export async function deleteInteractionResponse(bot, token, messageId) {
    await bot.rest.runMethod(bot.rest, "DELETE", messageId
        ? bot.constants.routes.INTERACTION_ID_TOKEN_MESSAGE_ID(bot.applicationId, token, messageId)
        : bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token));
}
