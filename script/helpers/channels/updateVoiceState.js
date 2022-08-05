"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserVoiceState = exports.updateBotVoiceState = void 0;
/**
 * Updates the bot's voice state
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - Bot must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
 *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
 *  - You are able to set `request_to_speak_timestamp` to any present or future time.
 *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
async function updateBotVoiceState(bot, guildId, options) {
    await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.UPDATE_VOICE_STATE(guildId), {
        channel_id: options.channelId,
        suppress: options.suppress,
        request_to_speak_timestamp: options.requestToSpeakTimestamp
            ? new Date(options.requestToSpeakTimestamp).toISOString()
            : options.requestToSpeakTimestamp,
    });
}
exports.updateBotVoiceState = updateBotVoiceState;
/**
 * Updates the a user's voice state
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - User must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
 *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
 *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
 *  - You are able to set `request_to_speak_timestamp` to any present or future time.
 *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
async function updateUserVoiceState(bot, guildId, options) {
    await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.UPDATE_VOICE_STATE(guildId, options.userId), {
        channel_id: options.channelId,
        suppress: options.suppress,
        user_id: options.userId,
    });
}
exports.updateUserVoiceState = updateUserVoiceState;
