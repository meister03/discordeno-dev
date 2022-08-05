"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editChannelOverwrite = void 0;
/** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
async function editChannelOverwrite(bot, channelId, overwrite) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwrite.id), {
        allow: overwrite.allow ? bot.utils.calculateBits(overwrite.allow) : "0",
        deny: overwrite.deny ? bot.utils.calculateBits(overwrite.deny) : "0",
        type: overwrite.type,
    });
}
exports.editChannelOverwrite = editChannelOverwrite;
