"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplicationCommand = void 0;
/** Deletes a application command. */
async function deleteApplicationCommand(bot, id, guildId) {
    await bot.rest.runMethod(bot.rest, "DELETE", guildId
        ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, id)
        : bot.constants.routes.COMMANDS_ID(bot.applicationId, id));
}
exports.deleteApplicationCommand = deleteApplicationCommand;
