import type { Bot } from "../../../bot.js";
import { AllowedMentions, FileContent, MessageComponents } from "../../../types/mod.js";
import { Embed } from "../../../transformers/embed.js";
/** Creates a new public thread from an existing message. Returns a thread channel. */
export declare function createForumPost(bot: Bot, channelId: bigint, options: CreateForumPostWithMessage): Promise<import("../../../mod.js").Channel>;
export interface CreateForumPostWithMessage extends CreateForumMessage {
    /** 1-100 character thread name */
    name: string;
    /** Duration in minutes to automatically archive the thread after recent activity */
    autoArchiveDuration: 60 | 1440 | 4320 | 10080;
    /** Amount of seconds a user has to wait before sending another message (0-21600) */
    rateLimitPerUser?: number | null;
    /** The reason you are creating the thread */
    reason?: string;
}
export interface CreateForumMessage {
    /** The message contents (up to 2000 characters) */
    content?: string;
    /** Embedded `rich` content (up to 6000 characters) */
    embeds?: Embed[];
    /** Allowed mentions for the message */
    allowedMentions?: AllowedMentions;
    /** The contents of the file being sent */
    file?: FileContent | FileContent[];
    /** The components you would like to have sent in this message */
    components?: MessageComponents;
}
