"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidgetImageURL = void 0;
/** Returns the widget image URL for the guild. */
async function getWidgetImageURL(bot, guildId, options) {
    return bot.constants.routes.GUILD_WIDGET_IMAGE(guildId, options?.style);
}
exports.getWidgetImageURL = getWidgetImageURL;
