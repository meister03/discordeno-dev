"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMember = void 0;
/** Returns a guild member object for the specified user. */
async function getMember(bot, guildId, id) {
    const data = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_MEMBER(guildId, id));
    if (!data?.user.id)
        return;
    return bot.transformers.member(bot, data, guildId, id);
}
exports.getMember = getMember;
