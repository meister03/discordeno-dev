"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChannel = void 0;
/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. Bot needs MANAGE_THREADS permissions in the server if deleting thread. */
async function deleteChannel(bot, channelId, reason) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL(channelId), {
        reason,
    });
}
exports.deleteChannel = deleteChannel;
