"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelWebhooks = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
async function getChannelWebhooks(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_WEBHOOKS(channelId));
    return new collection_js_1.Collection(result.map((hook) => {
        const webhook = bot.transformers.webhook(bot, hook);
        return [webhook.id, webhook];
    }));
}
exports.getChannelWebhooks = getChannelWebhooks;
