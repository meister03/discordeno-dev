"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBotNickname = void 0;
/** Edit the nickname of the bot in this guild */
async function editBotNickname(bot, guildId, options) {
    const response = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.USER_NICK(guildId), options);
    if (!response?.nick)
        return;
    return response.nick;
}
exports.editBotNickname = editBotNickname;
