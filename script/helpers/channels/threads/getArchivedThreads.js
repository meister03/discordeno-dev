"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchivedThreads = void 0;
const collection_js_1 = require("../../../util/collection.js");
/** Get the archived threads for this channel, defaults to public */
async function getArchivedThreads(bot, channelId, options) {
    let url = options?.type === "privateJoinedThreads"
        ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options)
        : options?.type === "private"
            ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE(channelId, options)
            : bot.constants.routes.THREAD_ARCHIVED_PUBLIC(channelId, options);
    const result = (await bot.rest.runMethod(bot.rest, "GET", url));
    return {
        threads: new collection_js_1.Collection(result.threads.map((t) => {
            const thread = bot.transformers.channel(bot, { channel: t });
            return [thread.id, thread];
        })),
        members: new collection_js_1.Collection(result.members.map((m) => {
            const member = bot.transformers.threadMember(bot, m);
            return [member.id, member];
        })),
        hasMore: result.has_more,
    };
}
exports.getArchivedThreads = getArchivedThreads;
