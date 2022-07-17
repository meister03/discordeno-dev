import type { Bot } from "../../../bot.js";
import { Collection } from "../../../util/collection.js";
/** Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order. */
export declare function getActiveThreads(bot: Bot, guildId: bigint): Promise<{
    threads: Collection<bigint, import("../../../mod.js").Channel>;
    members: Collection<bigint | undefined, import("../../../mod.js").ThreadMember>;
}>;
