import type { Bot } from "../../../bot.js";
import { ChannelTypes } from "../../../types/shared.js";
/** Creates a new private thread. Returns a thread channel. */
export declare function startThreadWithoutMessage(bot: Bot, channelId: bigint, options: StartThreadWithoutMessage): Promise<import("../../../mod.js").Channel>;
export interface StartThreadWithoutMessage {
    /** 1-100 character thread name */
    name: string;
    /** Duration in minutes to automatically archive the thread after recent activity */
    autoArchiveDuration: 60 | 1440 | 4320 | 10080;
    /** Amount of seconds a user has to wait before sending another message (0-21600) */
    rateLimitPerUser?: number | null;
    /** The reason you are creating the thread */
    reason?: string;
    /** the type of thread to create */
    type: ChannelTypes.GuildNewsThread | ChannelTypes.GuildPublicThread | ChannelTypes.GuildPrivateThread;
    /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
    invitable?: boolean;
}
