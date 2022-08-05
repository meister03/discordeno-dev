import type { Bot } from "../../../bot.js";
/** Creates a new public thread from an existing message. Returns a thread channel. */
export declare function startThreadWithMessage(bot: Bot, channelId: bigint, messageId: bigint, options: StartThreadWithMessage): Promise<import("../../../mod.js").Channel>;
export interface StartThreadWithMessage {
    /** 1-100 character thread name */
    name: string;
    /** Duration in minutes to automatically archive the thread after recent activity */
    autoArchiveDuration: 60 | 1440 | 4320 | 10080;
    /** Amount of seconds a user has to wait before sending another message (0-21600) */
    rateLimitPerUser?: number | null;
    /** The reason you are creating the thread */
    reason?: string;
}
