import { Collection } from "../../util/collection.js";
/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_WEBHOOKS(guildId));
    return new Collection(result.map((hook) => {
        const webhook = bot.transformers.webhook(bot, hook);
        return [webhook.id, webhook];
    }));
}
