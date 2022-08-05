"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarURL = void 0;
/** The users custom avatar or the default avatar if you don't have a member object. */
function avatarURL(bot, userId, discriminator, options) {
    return options?.avatar
        ? bot.utils.formatImageURL(bot.constants.routes.USER_AVATAR(userId, typeof options?.avatar === "string" ? options.avatar : bot.utils.iconBigintToHash(options?.avatar)), options?.size || 128, options?.format)
        : bot.constants.routes.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}
exports.avatarURL = avatarURL;
