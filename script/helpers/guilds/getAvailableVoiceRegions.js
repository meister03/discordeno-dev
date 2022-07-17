"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableVoiceRegions = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns an array of voice regions that can be used when creating servers. */
async function getAvailableVoiceRegions(bot) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.VOICE_REGIONS());
    return new collection_js_1.Collection(result.map((region) => {
        const voiceRegion = bot.transformers.voiceRegion(bot, region);
        return [voiceRegion.id, voiceRegion];
    }));
}
exports.getAvailableVoiceRegions = getAvailableVoiceRegions;
