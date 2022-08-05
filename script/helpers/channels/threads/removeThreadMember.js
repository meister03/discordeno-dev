"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeThreadMember = void 0;
/** Removes a user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. */
async function removeThreadMember(bot, threadId, userId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.THREAD_USER(threadId, userId));
}
exports.removeThreadMember = removeThreadMember;
