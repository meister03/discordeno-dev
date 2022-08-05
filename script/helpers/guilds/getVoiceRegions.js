"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoiceRegions = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
async function getVoiceRegions(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_REGIONS(guildId));
    return new collection_js_1.Collection(result.map((reg) => {
        const region = bot.transformers.voiceRegion(bot, reg);
        return [region.id, region];
    }));
}
exports.getVoiceRegions = getVoiceRegions;
