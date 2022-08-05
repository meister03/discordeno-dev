"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbanMember = void 0;
/** Remove the ban for a user. Requires BAN_MEMBERS permission */
async function unbanMember(bot, guildId, id) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_BAN(guildId, id));
}
exports.unbanMember = unbanMember;
