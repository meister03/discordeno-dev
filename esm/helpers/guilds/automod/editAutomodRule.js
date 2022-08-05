/** Edit a rule currently configured for guild. */
export async function editAutomodRule(bot, guildId, options) {
    const rule = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.AUTOMOD_RULES(guildId), {
        name: options.name,
        event_type: options.eventType,
        trigger_metadata: options.triggerMetadata
            ? {
                keyword_filter: options.triggerMetadata.keywordFilter,
                presets: options.triggerMetadata.presets,
            }
            : undefined,
        actions: options.actions?.map((action) => ({
            type: action.type,
            metadata: {
                channel_id: action.metadata.channelId?.toString(),
                duration_seconds: action.metadata.durationSeconds,
            },
        })),
        enabled: options.enabled ?? true,
        exempt_roles: options.exemptRoles?.map((id) => id.toString()),
        exempt_channels: options.exemptChannels?.map((id) => id.toString()),
    });
    return bot.transformers.automodRule(bot, rule);
}
