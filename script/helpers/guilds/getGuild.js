"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuild = void 0;
/**
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 */
async function getGuild(bot, guildId, options = {
    counts: true,
}) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD(guildId, options.counts));
    // Sometimes the guild is not found, so we need to check for it.
    if (!result.id)
        return;
    return bot.transformers.guild(bot, {
        guild: result,
        shardId: bot.utils.calculateShardId(bot.gateway, guildId),
    });
}
exports.getGuild = getGuild;
