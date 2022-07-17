"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannels = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns a list of guild channel objects. */
async function getChannels(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_CHANNELS(guildId));
    return new collection_js_1.Collection(result.map((res) => bot.transformers.channel(bot, { channel: res, guildId })).map((c) => [c.id, c]));
}
exports.getChannels = getChannels;
