"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessages = void 0;
/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
async function deleteMessages(bot, channelId, ids, reason) {
    if (ids.length < 2) {
        throw new Error(bot.constants.Errors.DELETE_MESSAGES_MIN);
    }
    if (ids.length > 100) {
        console.warn(`This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`);
    }
    await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_BULK_DELETE(channelId), {
        messages: ids.splice(0, 100).map((id) => id.toString()),
        reason,
    });
}
exports.deleteMessages = deleteMessages;
