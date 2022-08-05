"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRole = void 0;
/** Remove a role from the member */
async function removeRole(bot, guildId, memberId, roleId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId), { reason });
}
exports.removeRole = removeRole;
