"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChannelOverwrite = void 0;
/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
async function deleteChannelOverwrite(bot, channelId, overwriteId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwriteId));
}
exports.deleteChannelOverwrite = deleteChannelOverwrite;
