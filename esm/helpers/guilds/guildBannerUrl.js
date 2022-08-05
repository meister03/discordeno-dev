/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function guildBannerURL(bot, id, options) {
    return options.banner
        ? bot.utils.formatImageURL(bot.constants.routes.GUILD_BANNER(id, typeof options.banner === "string" ? options.banner : bot.utils.iconBigintToHash(options.banner)), options.size || 128, options.format)
        : undefined;
}
