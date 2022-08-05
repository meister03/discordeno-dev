"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStageInstance = void 0;
/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
async function deleteStageInstance(bot, channelId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.STAGE_INSTANCE(channelId));
}
exports.deleteStageInstance = deleteStageInstance;
