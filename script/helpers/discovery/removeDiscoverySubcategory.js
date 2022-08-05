"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDiscoverySubcategory = void 0;
/** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
async function removeDiscoverySubcategory(bot, guildId, categoryId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId));
}
exports.removeDiscoverySubcategory = removeDiscoverySubcategory;
