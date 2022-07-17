import { Collection } from "../../util/collection.js";
/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export async function getVoiceRegions(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_REGIONS(guildId));
    return new Collection(result.map((reg) => {
        const region = bot.transformers.voiceRegion(bot, reg);
        return [region.id, region];
    }));
}
