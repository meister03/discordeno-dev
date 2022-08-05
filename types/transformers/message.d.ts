import { Bot } from "../bot.js";
import { DiscordMessage } from "../types/discord.js";
import { MemberToggles } from "./toggles/member.js";
export declare function transformMessage(bot: Bot, payload: DiscordMessage): {
    application?: {
        description?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        flags?: import("../types/shared.js").ApplicationFlags | undefined;
        guild_id?: string | undefined;
        rpc_origins?: string[] | undefined;
        terms_of_service_url?: string | undefined;
        privacy_policy_url?: string | undefined;
        verify_key?: string | undefined;
        primary_sku_id?: string | undefined;
        slug?: string | undefined;
        icon?: string | null | undefined;
        bot_public?: boolean | undefined;
        bot_require_code_grant?: boolean | undefined;
        owner?: {
            id?: string | undefined;
            avatar?: string | null | undefined;
            discriminator?: string | undefined;
            username?: string | undefined;
            locale?: string | undefined;
            flags?: import("../types/shared.js").UserFlags | undefined;
            premium_type?: import("../types/shared.js").PremiumTypes | undefined;
            public_flags?: import("../types/shared.js").UserFlags | undefined;
            accent_color?: number | undefined;
            bot?: boolean | undefined;
            system?: boolean | undefined;
            mfa_enabled?: boolean | undefined;
            verified?: boolean | undefined;
            email?: string | null | undefined;
            banner?: string | undefined;
        } | undefined;
        team?: {
            icon?: string | null | undefined;
            id: string;
            name: string;
            members: import("../types/discord.js").DiscordTeamMember[];
            owner_user_id: string;
        } | null | undefined;
        cover_image?: string | undefined;
        tags?: string[] | undefined;
        install_params?: {
            permissions: string;
            scopes: string[];
        } | undefined;
        custom_install_url?: string | undefined;
    } | undefined;
    flags?: number | undefined;
    guildId?: bigint | undefined;
    member?: {
        avatar?: bigint | undefined;
        permissions?: bigint | undefined;
        nick?: string | undefined;
        premiumSince?: number | undefined;
        communicationDisabledUntil?: number | undefined;
        id: bigint;
        guildId: bigint;
        roles: bigint[];
        toggles: MemberToggles;
        joinedAt: number;
    } | undefined;
    applicationId?: bigint | undefined;
    editedTimestamp?: number | undefined;
    reactions?: {
        emoji: {
            id?: bigint | undefined;
            name?: string | undefined;
            user?: {
                avatar?: bigint | undefined;
                locale?: string | undefined;
                flags?: import("../types/shared.js").UserFlags | undefined;
                email?: string | undefined;
                premiumType?: import("../types/shared.js").PremiumTypes | undefined;
                publicFlags?: import("../types/shared.js").UserFlags | undefined;
                id: bigint;
                discriminator: string;
                username: string;
                toggles: import("./mod.js").UserToggles;
            } | undefined;
            roles?: bigint[] | undefined;
            toggles: import("./mod.js").EmojiToggles;
        };
        count: number;
        me: boolean;
    }[] | undefined;
    activity?: {
        partyId?: string | undefined;
        type: import("../types/shared.js").MessageActivityTypes;
    } | undefined;
    interaction?: {
        member?: {
            avatar?: bigint | undefined;
            guildId?: bigint | undefined;
            permissions?: bigint | undefined;
            nick?: string | undefined;
            roles?: bigint[] | undefined;
            joinedAt?: number | undefined;
            premiumSince?: number | undefined;
            communicationDisabledUntil?: number | undefined;
            id: bigint;
            toggles: MemberToggles;
        } | undefined;
        type: import("../types/shared.js").InteractionTypes;
        id: bigint;
        name: string;
        user: {
            avatar?: bigint | undefined;
            locale?: string | undefined;
            flags?: import("../types/shared.js").UserFlags | undefined;
            email?: string | undefined;
            premiumType?: import("../types/shared.js").PremiumTypes | undefined;
            publicFlags?: import("../types/shared.js").UserFlags | undefined;
            id: bigint;
            discriminator: string;
            username: string;
            toggles: import("./mod.js").UserToggles;
        };
    } | undefined;
    thread?: {
        name?: string | undefined;
        position?: number | undefined;
        flags?: import("../types/shared.js").ChannelFlags | undefined;
        topic?: string | undefined;
        bitrate?: number | undefined;
        nsfw?: boolean | undefined;
        permissions?: bigint | undefined;
        archived?: boolean | undefined;
        locked?: boolean | undefined;
        invitable?: boolean | undefined;
        applicationId?: bigint | undefined;
        userLimit?: number | undefined;
        rateLimitPerUser?: number | undefined;
        rtcRegion?: string | undefined;
        videoQualityMode?: import("../types/shared.js").VideoQualityModes | undefined;
        lastPinTimestamp?: number | undefined;
        lastMessageId?: bigint | undefined;
        ownerId?: bigint | undefined;
        parentId?: bigint | undefined;
        memberCount?: number | undefined;
        messageCount?: number | undefined;
        archiveTimestamp?: number | undefined;
        autoArchiveDuration?: 60 | 1440 | 4320 | 10080 | undefined;
        createTimestamp?: number | undefined;
        newlyCreated?: boolean | undefined;
        type: import("../types/shared.js").ChannelTypes;
        id: bigint;
        guildId: bigint;
        permissionOverwrites: bigint[];
        botIsMember: boolean;
    } | undefined;
    components?: {
        url?: string | undefined;
        value?: string | undefined;
        label?: string | undefined;
        style?: import("../types/shared.js").ButtonStyles | import("../types/shared.js").TextStyles | undefined;
        disabled?: boolean | undefined;
        options?: {
            description?: string | undefined;
            default?: boolean | undefined;
            emoji?: {
                id?: bigint | undefined;
                name?: string | undefined;
                animated?: boolean | undefined;
            } | undefined;
            value: string;
            label: string;
        }[] | undefined;
        emoji?: {
            id?: bigint | undefined;
            name?: string | undefined;
            animated?: boolean | undefined;
        } | undefined;
        components?: any[] | undefined;
        customId?: string | undefined;
        placeholder?: string | undefined;
        minValues?: number | undefined;
        maxValues?: number | undefined;
        type: import("../types/shared.js").MessageComponentTypes;
    }[] | undefined;
    stickerItems?: {
        id: bigint;
        name: string;
        formatType: import("../types/shared.js").StickerFormatTypes;
    }[] | undefined;
    webhookId?: bigint | undefined;
    messageReference?: {
        guildId?: bigint | undefined;
        channelId?: bigint | undefined;
        messageId?: bigint | undefined;
    } | undefined;
    type: import("../types/shared.js").MessageTypes;
    id: bigint;
    content: string;
    channelId: bigint;
    timestamp: number;
    isBot: boolean;
    tag: string;
    bitfield: bigint;
    attachments: import("./attachment.js").Attachment[];
    embeds: import("./embed.js").Embed[];
    authorId: bigint;
    mentionedUserIds: bigint[];
    mentionedRoleIds: bigint[];
    mentionedChannelIds: bigint[];
};
export interface Message extends ReturnType<typeof transformMessage> {
}
