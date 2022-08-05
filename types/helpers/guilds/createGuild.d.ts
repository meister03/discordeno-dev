import type { Bot } from "../../bot.js";
import { Channel } from "../../transformers/channel.js";
import { Role } from "../../transformers/role.js";
import { DefaultMessageNotificationLevels, ExplicitContentFilterLevels, SystemChannelFlags, VerificationLevels } from "../../types/shared.js";
/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
export declare function createGuild(bot: Bot, options: CreateGuild): Promise<import("../../mod.js").Guild>;
/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
    /** Name of the guild (1-100 characters) */
    name: string;
    /** Base64 128x128 image for the guild icon */
    icon?: string;
    /** Verification level */
    verificationLevel?: VerificationLevels;
    /** Default message notification level */
    defaultMessageNotifications?: DefaultMessageNotificationLevels;
    /** Explicit content filter level */
    explicitContentFilter?: ExplicitContentFilterLevels;
    /** New guild roles (first role is the everyone role) */
    roles?: Role[];
    /** New guild's channels */
    channels?: Partial<Channel>[];
    /** Id for afk channel */
    afkChannelId?: string;
    /** Afk timeout in seconds */
    afkTimeout?: number;
    /** The id of the channel where guild notices such as welcome messages and boost events are posted */
    systemChannelId?: string;
    /** System channel flags */
    systemChannelFlags?: SystemChannelFlags;
}
