"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMember = exports.transformUser = void 0;
const member_js_1 = require("./toggles/member.js");
const user_js_1 = require("./toggles/user.js");
function transformUser(bot, payload) {
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
        toggles: new user_js_1.UserToggles(payload),
    };
    return user;
}
exports.transformUser = transformUser;
function transformMember(bot, payload, guildId, userId) {
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
        toggles: new member_js_1.MemberToggles(payload),
    };
    return member;
}
exports.transformMember = transformMember;
