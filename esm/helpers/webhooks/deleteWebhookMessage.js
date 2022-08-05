export async function deleteWebhookMessage(bot, webhookId, webhookToken, messageId, options) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId, options));
}
