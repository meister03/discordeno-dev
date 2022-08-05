"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinThread = void 0;
/** Adds the bot to the thread. Cannot join an archived thread. */
async function joinThread(bot, threadId) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.THREAD_ME(threadId));
}
exports.joinThread = joinThread;
