"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAutoModerationRule = void 0;
function transformAutoModerationRule(bot, payload) {
    const rule = {
        name: payload.name,
        eventType: payload.event_type,
        triggerType: payload.trigger_type,
        enabled: payload.enabled,
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        creatorId: bot.transformers.snowflake(payload.creator_id),
        exemptRoles: payload.exempt_roles.map((id) => bot.transformers.snowflake(id)),
        exemptChannels: payload.exempt_channels.map((id) => bot.transformers.snowflake(id)),
        triggerMetadata: payload.trigger_metadata
            ? {
                keywordFilter: payload.trigger_metadata.keyword_filter,
                presets: payload.trigger_metadata.presets,
            }
            : undefined,
        actions: payload.actions.map((action) => ({
            type: action.type,
            metadata: action.metadata
                ? {
                    channelId: action.metadata.channel_id ? bot.transformers.snowflake(action.metadata.channel_id) : undefined,
                    durationSeconds: action.metadata.duration_seconds,
                }
                : undefined,
        })),
    };
    return rule;
}
exports.transformAutoModerationRule = transformAutoModerationRule;
