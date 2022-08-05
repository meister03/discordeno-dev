import { Collection } from "../../../util/collection.js";
import type { Bot } from "../../../bot.js";
/** Get the archived threads for this channel, defaults to public */
export declare function getArchivedThreads(bot: Bot, channelId: bigint, options?: ListArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
}): Promise<{
    threads: Collection<bigint, import("../../../mod.js").Channel>;
    members: Collection<bigint | undefined, import("../../../mod.js").ThreadMember>;
    hasMore: boolean;
}>;
/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
    /** Returns threads before this timestamp */
    before?: number;
    /** Optional maximum number of threads to return */
    limit?: number;
}
