"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhooks = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
async function getWebhooks(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_WEBHOOKS(guildId));
    return new collection_js_1.Collection(result.map((hook) => {
        const webhook = bot.transformers.webhook(bot, hook);
        return [webhook.id, webhook];
    }));
}
exports.getWebhooks = getWebhooks;
