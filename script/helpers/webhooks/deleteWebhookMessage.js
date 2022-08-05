"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebhookMessage = void 0;
async function deleteWebhookMessage(bot, webhookId, webhookToken, messageId, options) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId, options));
}
exports.deleteWebhookMessage = deleteWebhookMessage;
