"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvite = void 0;
/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
async function getInvite(bot, inviteCode, options) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.INVITE(inviteCode, options));
    return {
        code: result.code,
        guildId: result.guild?.id ? bot.transformers.snowflake(result.guild.id) : undefined,
        channelId: result.channel?.id ? bot.transformers.snowflake(result.channel.id) : undefined,
        inviter: result.inviter ? bot.transformers.user(bot, result.inviter) : undefined,
        targetType: result.target_type,
        targetUser: result.target_user ? bot.transformers.user(bot, result.target_user) : undefined,
        targetApplicationId: result.target_application?.id
            ? bot.transformers.snowflake(result.target_application.id)
            : undefined,
        approximatePresenceCount: result.approximate_presence_count,
        approximateMemberCount: result.approximate_member_count,
        expiresAt: result.expires_at ? Date.parse(result.expires_at) : undefined,
    };
}
exports.getInvite = getInvite;
