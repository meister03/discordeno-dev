"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIntegration = void 0;
/** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
async function deleteIntegration(bot, guildId, id) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_INTEGRATION(guildId, id));
}
exports.deleteIntegration = deleteIntegration;
