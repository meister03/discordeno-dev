"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guildIconURL = void 0;
/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
function guildIconURL(bot, id, icon, options) {
    return icon
        ? bot.utils.formatImageURL(bot.constants.routes.GUILD_ICON(id, typeof icon === "string" ? icon : bot.utils.iconBigintToHash(icon)), options?.size || 128, options?.format)
        : undefined;
}
exports.guildIconURL = guildIconURL;
