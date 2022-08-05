"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRole = void 0;
/** Add a role to the member */
async function addRole(bot, guildId, memberId, roleId, reason) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.GUILD_MEMBER_ROLE(guildId, memberId, roleId), { reason });
}
exports.addRole = addRole;
