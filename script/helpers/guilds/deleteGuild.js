"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuild = void 0;
/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
async function deleteGuild(bot, guildId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD(guildId));
}
exports.deleteGuild = deleteGuild;
