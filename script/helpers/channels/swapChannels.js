"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapChannels = void 0;
/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permission. Only channels to be modified are required. */
async function swapChannels(bot, guildId, channelPositions) {
    if (!channelPositions.length) {
        throw "You must provide at least one channels to be moved.";
    }
    await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_CHANNELS(guildId), channelPositions.map((channelPosition) => {
        return {
            id: channelPosition.id,
            position: channelPosition.position,
            lock_positions: channelPosition.lockPositions,
            parent_id: channelPosition.parentId,
        };
    }));
}
exports.swapChannels = swapChannels;
