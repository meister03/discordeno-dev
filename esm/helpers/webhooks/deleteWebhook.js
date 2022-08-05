/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(bot, webhookId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_ID(webhookId), { reason });
}
