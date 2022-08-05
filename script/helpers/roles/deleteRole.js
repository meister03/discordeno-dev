"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = void 0;
/** Delete a guild role. Requires the MANAGE_ROLES permission. */
async function deleteRole(bot, guildId, id) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_ROLE(guildId, id));
}
exports.deleteRole = deleteRole;
