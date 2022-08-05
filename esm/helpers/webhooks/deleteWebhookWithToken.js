/** Delete a webhook permanently. Returns a undefined on success */
export async function deleteWebhookWithToken(bot, webhookId, webhookToken) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK(webhookId, webhookToken));
}
