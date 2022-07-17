import type { Bot } from "../../../bot.js";
import { Collection } from "../../../util/collection.js";
/** Returns thread members objects that are members of the thread. */
export declare function getThreadMembers(bot: Bot, threadId: bigint): Promise<Collection<bigint | undefined, import("../../../mod.js").ThreadMember>>;
