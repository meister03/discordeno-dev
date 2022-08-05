"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function editWebhook(bot) {
    const editWebhookOld = bot.helpers.editWebhook;
    bot.helpers.editWebhook = async function (webhookId, options, fromChannelId) {
        if (options.channelId)
            (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, ["MANAGE_WEBHOOKS"]);
        if (fromChannelId)
            (0, permissions_js_1.requireBotChannelPermissions)(bot, fromChannelId, ["MANAGE_WEBHOOKS"]);
        if (options.name) {
            if (
            // Specific usernames that discord does not allow
            options.name === "clyde" ||
                !bot.utils.validateLength(options.name, { min: 2, max: 32 })) {
                throw new Error("The webhook name can not be clyde and it must be between 2 and 32 characters long.");
            }
        }
        return await editWebhookOld(webhookId, options);
    };
}
exports.default = editWebhook;
