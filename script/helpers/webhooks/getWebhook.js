"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhook = void 0;
/** Returns the new webhook object for the given id. */
async function getWebhook(bot, webhookId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.WEBHOOK_ID(webhookId));
    if (!result?.id)
        return;
    return bot.transformers.webhook(bot, result);
}
exports.getWebhook = getWebhook;
