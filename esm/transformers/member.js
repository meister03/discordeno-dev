import { MemberToggles } from "./toggles/member.js";
import { UserToggles } from "./toggles/user.js";
export function transformUser(bot, payload) {
    const user = {
        id: bot.transformers.snowflake(payload.id || ""),
        username: payload.username,
        discriminator: payload.discriminator,
        avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
        locale: payload.locale,
        email: payload.email ?? undefined,
        flags: payload.flags,
        premiumType: payload.premium_type,
        publicFlags: payload.public_flags,
        toggles: new UserToggles(payload),
    };
    return user;
}
export function transformMember(bot, payload, guildId, userId) {
    const member = {
        id: userId,
        guildId,
        nick: payload.nick ?? undefined,
        roles: payload.roles.map((id) => bot.transformers.snowflake(id)),
        joinedAt: Date.parse(payload.joined_at),
        premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
        avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
        permissions: payload.permissions ? bot.transformers.snowflake(payload.permissions) : undefined,
        communicationDisabledUntil: payload.communication_disabled_until
            ? Date.parse(payload.communication_disabled_until)
            : undefined,
        toggles: new MemberToggles(payload),
    };
    return member;
}
