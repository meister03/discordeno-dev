"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmoji = void 0;
/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
async function deleteEmoji(bot, guildId, id, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_EMOJI(guildId, id), {
        reason,
    });
}
exports.deleteEmoji = deleteEmoji;
