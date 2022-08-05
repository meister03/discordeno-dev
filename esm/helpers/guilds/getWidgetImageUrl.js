/** Returns the widget image URL for the guild. */
export async function getWidgetImageURL(bot, guildId, options) {
    return bot.constants.routes.GUILD_WIDGET_IMAGE(guildId, options?.style);
}
