"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveThreads = void 0;
const collection_js_1 = require("../../../util/collection.js");
/** Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order. */
async function getActiveThreads(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.THREAD_ACTIVE(guildId));
    return {
        threads: new collection_js_1.Collection(result.threads.map((t) => {
            const thread = bot.transformers.channel(bot, { channel: t });
            return [thread.id, thread];
        })),
        members: new collection_js_1.Collection(result.members.map((m) => {
            const member = bot.transformers.threadMember(bot, m);
            return [member.id, member];
        })),
    };
}
exports.getActiveThreads = getActiveThreads;
