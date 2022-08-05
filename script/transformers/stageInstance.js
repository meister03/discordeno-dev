"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformStageInstance = void 0;
function transformStageInstance(bot, payload) {
    const stageInstance = {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        topic: payload.topic,
        guildScheduledEventId: payload.guild_scheduled_event_id
            ? bot.transformers.snowflake(payload.guild_scheduled_event_id)
            : undefined,
    };
    return stageInstance;
}
exports.transformStageInstance = transformStageInstance;
