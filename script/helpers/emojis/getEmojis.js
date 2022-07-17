"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmojis = void 0;
const collection_js_1 = require("../../util/collection.js");
/**
 * Returns a list of emojis for the given guild.
 */
async function getEmojis(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_EMOJIS(guildId));
    return new collection_js_1.Collection(result.map((e) => [bot.transformers.snowflake(e.id), bot.transformers.emoji(bot, e)]));
}
exports.getEmojis = getEmojis;
