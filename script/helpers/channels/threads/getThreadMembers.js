"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreadMembers = void 0;
const collection_js_1 = require("../../../util/collection.js");
/** Returns thread members objects that are members of the thread. */
async function getThreadMembers(bot, threadId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.THREAD_MEMBERS(threadId));
    // return result;
    return new collection_js_1.Collection(result.map((res) => {
        const member = bot.transformers.threadMember(bot, res);
        return [member.id, member];
    }));
}
exports.getThreadMembers = getThreadMembers;
