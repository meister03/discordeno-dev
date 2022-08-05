/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export async function editGuild(bot, guildId, options, shardId) {
    if (options.icon && !options.icon.startsWith("data:image/")) {
        options.icon = await bot.utils.urlToBase64(options.icon);
    }
    if (options.banner && !options.banner.startsWith("data:image/")) {
        options.banner = await bot.utils.urlToBase64(options.banner);
    }
    if (options.splash && !options.splash.startsWith("data:image/")) {
        options.splash = await bot.utils.urlToBase64(options.splash);
    }
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD(guildId), {
        name: options.name,
        verification_levels: options.verificationLevel,
        default_message_notifications: options.defaultMessageNotifications,
        explicit_content_filter: options.explicitContentFilter,
        afk_channel_id: options.afkChannelId ? options.afkChannelId.toString() : options.afkChannelId,
        afk_timeout: options.afkTimeout,
        icon: options.icon,
        owner_id: options.ownerId ? options.ownerId.toString() : options.ownerId,
        splash: options.splash,
        discovery_splash: options.discoverySplash,
        banner: options.banner,
        system_channel_id: options.systemChannelId ? options.systemChannelId.toString() : options.systemChannelId,
        system_channel_flags: options.systemChannelFlags,
        rules_channel_id: options.rulesChannelId ? options.rulesChannelId.toString() : options.rulesChannelId,
        public_updates_channel_id: options.publicUpdatesChannelId
            ? options.publicUpdatesChannelId.toString()
            : options.publicUpdatesChannelId,
        preferred_locale: options.preferredLocale,
        features: options.features,
        premium_progress_bar_enabled: options.premiumProgressBarEnabled,
    });
    return bot.transformers.guild(bot, {
        guild: result,
        shardId,
    });
}
