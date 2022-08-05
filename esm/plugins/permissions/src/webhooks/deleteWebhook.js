import { requireBotChannelPermissions } from "../permissions.js";
export default function deleteWebhook(bot) {
    const deleteWebhookOld = bot.helpers.deleteWebhook;
    bot.helpers.deleteWebhook = async function (channelId, options) {
        requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);
        return await deleteWebhookOld(channelId, options);
    };
}
