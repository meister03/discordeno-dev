"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveThread = void 0;
/** Removes the bot from a thread. Requires the thread is not archived. */
async function leaveThread(bot, threadId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.THREAD_ME(threadId));
}
exports.leaveThread = leaveThread;
