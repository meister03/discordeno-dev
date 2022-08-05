"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = void 0;
/** Fetches a single channel object from the api. */
async function getChannel(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL(channelId));
    // IF A CHANNEL DOESN'T EXIST, DISCORD RETURNS `{}`
    return result.id
        ? bot.transformers.channel(bot, {
            channel: result,
            guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
        })
        : undefined;
}
exports.getChannel = getChannel;
