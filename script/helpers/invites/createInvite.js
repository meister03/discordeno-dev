"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvite = void 0;
/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
async function createInvite(bot, channelId, options = {}) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_INVITES(channelId), {
        max_age: options.maxAge,
        max_uses: options.maxUses,
        temporary: options.temporary,
        unique: options.unique,
        target_type: options.targetType,
        target_user_id: options.targetUserId,
        target_application_id: options.targetApplicationId,
    });
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
exports.createInvite = createInvite;
