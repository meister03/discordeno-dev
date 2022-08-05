import { Collection } from "../../util/collection.js";
/** Returns a list of guild channel objects. */
export async function getChannels(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_CHANNELS(guildId));
    return new Collection(result.map((res) => bot.transformers.channel(bot, { channel: res, guildId })).map((c) => [c.id, c]));
}
