"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function createWebhook(bot) {
    const createWebhookOld = bot.helpers.createWebhook;
    bot.helpers.createWebhook = async function (channelId, options) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_WEBHOOKS"]);
        if (
        // Specific usernames that discord does not allow
        options.name === "clyde" ||
            !bot.utils.validateLength(options.name, { min: 2, max: 32 })) {
            throw new Error("The webhook name can not be clyde and it must be between 2 and 32 characters long.");
        }
        return await createWebhookOld(channelId, options);
    };
}
exports.default = createWebhook;
