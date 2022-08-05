import type { Bot } from "../../../bot.js";
/** Returns thread members objects that are members of the thread. */
export declare function getThreadMember(bot: Bot, threadId: bigint, userId: bigint): Promise<{
    id: bigint | undefined;
    userId: bigint | undefined;
    joinTimestamp: number;
    flags: number;
}>;
