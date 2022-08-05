/** Get a rule currently configured for guild. */
export async function createAutomodRule(bot, guildId, options) {
    const rule = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.AUTOMOD_RULES(guildId), {
        name: options.name,
        event_type: options.eventType,
        trigger_type: options.triggerType,
        trigger_metadata: {
            keyword_filter: options.triggerMetadata.keywordFilter,
            presets: options.triggerMetadata.presets,
        },
        actions: options.actions.map((action) => ({
            type: action.type,
            metadata: action.metadata
                ? {
                    channel_id: action.metadata.channelId?.toString(),
                    duration_seconds: action.metadata.durationSeconds,
                }
                : undefined,
        })),
        enabled: options.enabled ?? true,
        exempt_roles: options.exemptRoles?.map((id) => id.toString()),
        exempt_channels: options.exemptChannels?.map((id) => id.toString()),
    });
    return bot.transformers.automodRule(bot, rule);
}
