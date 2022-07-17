"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformThreadMemberGuildCreate = exports.transformThreadMember = void 0;
function transformThreadMember(bot, payload) {
    const threadMember = {
        id: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
        threadId: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
        joinTimestamp: Date.parse(payload.join_timestamp),
    };
    return threadMember;
}
exports.transformThreadMember = transformThreadMember;
function transformThreadMemberGuildCreate(bot, payload) {
    const threadMember = {
        joinTimestamp: Date.parse(payload.join_timestamp),
    };
    return threadMember;
}
exports.transformThreadMemberGuildCreate = transformThreadMemberGuildCreate;
