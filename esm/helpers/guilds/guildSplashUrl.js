/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export function guildSplashURL(bot, id, splash, options) {
    return splash
        ? bot.utils.formatImageURL(bot.constants.routes.GUILD_SPLASH(id, typeof splash === "string" ? splash : bot.utils.iconBigintToHash(splash)), options?.size || 128, options?.format)
        : undefined;
}
