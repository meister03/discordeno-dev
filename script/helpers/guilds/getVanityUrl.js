"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanityUrl = void 0;
/** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
async function getVanityUrl(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_VANITY_URL(guildId));
    return {
        uses: result.uses,
        code: result.code,
    };
}
exports.getVanityUrl = getVanityUrl;
