import { Collection } from "../../../util/collection.js";
/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(bot, channelId, options) {
    let url = options?.type === "privateJoinedThreads"
        ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options)
        : options?.type === "private"
            ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE(channelId, options)
            : bot.constants.routes.THREAD_ARCHIVED_PUBLIC(channelId, options);
    const result = (await bot.rest.runMethod(bot.rest, "GET", url));
    return {
        threads: new Collection(result.threads.map((t) => {
            const thread = bot.transformers.channel(bot, { channel: t });
            return [thread.id, thread];
        })),
        members: new Collection(result.members.map((m) => {
            const member = bot.transformers.threadMember(bot, m);
            return [member.id, member];
        })),
        hasMore: result.has_more,
    };
}
