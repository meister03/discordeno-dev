import { Collection } from "../../util/collection.js";
/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_WEBHOOKS(channelId));
    return new Collection(result.map((hook) => {
        const webhook = bot.transformers.webhook(bot, hook);
        return [webhook.id, webhook];
    }));
}
