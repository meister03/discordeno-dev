"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPresence = exports.statusTypes = void 0;
const user_js_1 = require("./toggles/user.js");
exports.statusTypes = Object.freeze({
    online: 0,
    dnd: 1,
    idle: 2,
    invisible: 3,
    offline: 4,
});
function transformPresence(bot, payload) {
    const presence = {
        user: {
            id: bot.transformers.snowflake(payload.user.id || ""),
            username: payload.user.username ?? undefined,
            discriminator: payload.user.discriminator ?? undefined,
            avatar: payload.user.avatar ? bot.utils.iconHashToBigInt(payload.user.avatar) : undefined,
            locale: payload.user.locale ?? undefined,
            email: payload.user.email ?? undefined,
            flags: payload.user.flags ?? undefined,
            premiumType: payload.user.premium_type ?? undefined,
            publicFlags: payload.user.public_flags ?? undefined,
            toggles: new user_js_1.UserToggles(payload.user),
        },
        guildId: bot.transformers.snowflake(payload.guild_id),
        status: exports.statusTypes[payload.status],
        activities: payload.activities.map((activity) => bot.transformers.activity(bot, activity)),
        desktop: payload.client_status.desktop,
        mobile: payload.client_status.mobile,
        web: payload.client_status.web,
    };
    return presence;
}
exports.transformPresence = transformPresence;
