"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiscoverySubcategory = void 0;
/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
async function addDiscoverySubcategory(bot, guildId, categoryId) {
    await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId));
}
exports.addDiscoverySubcategory = addDiscoverySubcategory;
