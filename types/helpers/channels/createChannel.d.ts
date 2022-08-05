import type { Bot } from "../../bot.js";
import { ChannelTypes } from "../../types/shared.js";
import { OverwriteReadable } from "./editChannelOverwrite.js";
/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export declare function createChannel(bot: Bot, guildId: bigint, options?: CreateGuildChannel, reason?: string): Promise<import("../../mod.js").Channel>;
export interface CreateGuildChannel {
    /** Channel name (1-100 characters) */
    name: string;
    /** The type of channel */
    type?: ChannelTypes;
    /** Channel topic (0-1024 characters) */
    topic?: string;
    /** The bitrate (in bits) of the voice channel (voice only) */
    bitrate?: number;
    /** The user limit of the voice channel (voice only) */
    userLimit?: number;
    /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
    rateLimitPerUser?: number;
    /** Sorting position of the channel */
    position?: number;
    /** The channel's permission overwrites */
    permissionOverwrites?: OverwriteReadable[];
    /** Id of the parent category for a channel */
    parentId?: bigint;
    /** Whether the channel is nsfw */
    nsfw?: boolean;
    /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
    defaultAutoArchiveDuration?: number;
}
