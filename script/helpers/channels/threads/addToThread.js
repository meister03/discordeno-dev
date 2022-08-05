"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToThread = void 0;
/** Adds a user to a thread. Requires the ability to send messages in the thread. Requires the thread is not archived. */
async function addToThread(bot, threadId, userId) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.THREAD_USER(threadId, userId));
}
exports.addToThread = addToThread;
