"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreadMember = void 0;
/** Returns thread members objects that are members of the thread. */
async function getThreadMember(bot, threadId, userId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.THREAD_USER(threadId, userId));
    return {
        id: result.id ? bot.transformers.snowflake(result.id) : undefined,
        userId: result.user_id ? bot.transformers.snowflake(result.user_id) : undefined,
        joinTimestamp: Date.parse(result.join_timestamp),
        flags: result.flags,
    };
}
exports.getThreadMember = getThreadMember;
