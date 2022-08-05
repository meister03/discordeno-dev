/** Returns the new webhook object for the given id. */
export async function getWebhook(bot, webhookId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.WEBHOOK_ID(webhookId));
    if (!result?.id)
        return;
    return bot.transformers.webhook(bot, result);
}
