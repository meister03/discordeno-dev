import { Collection } from "../../util/collection.js";
/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
export async function getDiscoveryCategories(bot) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.DISCOVERY_CATEGORIES());
    return new Collection(result.map((category) => [category.id, category]));
}
