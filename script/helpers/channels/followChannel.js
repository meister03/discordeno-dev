"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followChannel = void 0;
/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
async function followChannel(bot, sourceChannelId, targetChannelId) {
    const data = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_FOLLOW(sourceChannelId), {
        webhook_channel_id: targetChannelId,
    });
    return bot.transformers.snowflake(data.webhook_id);
}
exports.followChannel = followChannel;
