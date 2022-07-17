"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBan = void 0;
/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
async function getBan(bot, guildId, memberId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_BAN(guildId, memberId));
    if (!result?.user)
        return;
    return {
        reason: result.reason,
        user: bot.transformers.user(bot, result.user),
    };
}
exports.getBan = getBan;
