import { Collection } from "../../util/collection.js";
/**
 * Returns a list of emojis for the given guild.
 */
export async function getEmojis(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_EMOJIS(guildId));
    return new Collection(result.map((e) => [bot.transformers.snowflake(e.id), bot.transformers.emoji(bot, e)]));
}
