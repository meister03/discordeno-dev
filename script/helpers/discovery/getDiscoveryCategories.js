"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscoveryCategories = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
async function getDiscoveryCategories(bot) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.DISCOVERY_CATEGORIES());
    return new collection_js_1.Collection(result.map((category) => [category.id, category]));
}
exports.getDiscoveryCategories = getDiscoveryCategories;
