/** Adds the bot to the thread. Cannot join an archived thread. */
export async function joinThread(bot, threadId) {
    await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.THREAD_ME(threadId));
}
