"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebhookWithToken = void 0;
/** Delete a webhook permanently. Returns a undefined on success */
async function deleteWebhookWithToken(bot, webhookId, webhookToken) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK(webhookId, webhookToken));
}
exports.deleteWebhookWithToken = deleteWebhookWithToken;
