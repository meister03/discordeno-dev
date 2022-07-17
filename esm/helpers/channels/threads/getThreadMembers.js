import { Collection } from "../../../util/collection.js";
/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(bot, threadId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.THREAD_MEMBERS(threadId));
    // return result;
    return new Collection(result.map((res) => {
        const member = bot.transformers.threadMember(bot, res);
        return [member.id, member];
    }));
}
