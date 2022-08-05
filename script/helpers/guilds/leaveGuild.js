"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveGuild = void 0;
/** Leave a guild */
async function leaveGuild(bot, guildId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_LEAVE(guildId));
}
exports.leaveGuild = leaveGuild;
