"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function deleteWebhook(bot) {
    const deleteWebhookOld = bot.helpers.deleteWebhook;
    bot.helpers.deleteWebhook = async function (channelId, options) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_WEBHOOKS"]);
        return await deleteWebhookOld(channelId, options);
    };
}
exports.default = deleteWebhook;
