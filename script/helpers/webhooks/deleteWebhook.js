"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebhook = void 0;
/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
async function deleteWebhook(bot, webhookId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_ID(webhookId), { reason });
}
exports.deleteWebhook = deleteWebhook;
