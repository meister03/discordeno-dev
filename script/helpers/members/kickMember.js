"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kickMember = void 0;
/** Kick a member from the server */
async function kickMember(bot, guildId, memberId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_MEMBER(guildId, memberId), {
        reason,
    });
}
exports.kickMember = kickMember;
