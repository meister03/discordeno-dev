import { ListArchivedThreads } from "../helpers/channels/threads/getArchivedThreads.js";
import { GetGuildAuditLog } from "../helpers/guilds/getAuditLogs.js";
import { GetBans } from "../helpers/guilds/getBans.js";
import { GetGuildPruneCountQuery } from "../helpers/guilds/getPruneCount.js";
import { GetScheduledEventUsers } from "../helpers/guilds/scheduledEvents/getScheduledEventUsers.js";
import { GetInvite } from "../helpers/invites/getInvite.js";
import { ListGuildMembers } from "../helpers/members/getMembers.js";
import { GetMessagesOptions } from "../helpers/messages/getMessages.js";
import { GetReactions } from "../helpers/messages/getReactions.js";
export declare const routes: {
    GATEWAY_BOT: () => string;
    AUTOMOD_RULES: (guildId: bigint) => string;
    AUTOMOD_RULE: (guildId: bigint, ruleId: bigint) => string;
    CHANNEL: (channelId: bigint) => string;
    CHANNEL_MESSAGE: (channelId: bigint, messageId: bigint) => string;
    CHANNEL_MESSAGES: (channelId: bigint, options?: GetMessagesOptions | undefined) => string;
    CHANNEL_PIN: (channelId: bigint, messageId: bigint) => string;
    CHANNEL_PINS: (channelId: bigint) => string;
    CHANNEL_BULK_DELETE: (channelId: bigint) => string;
    CHANNEL_INVITES: (channelId: bigint) => string;
    CHANNEL_WEBHOOKS: (channelId: bigint) => string;
    CHANNEL_MESSAGE_REACTION_ME: (channelId: bigint, messageId: bigint, emoji: string) => string;
    CHANNEL_MESSAGE_REACTION_USER: (channelId: bigint, messageId: bigint, emoji: string, userId: bigint) => string;
    CHANNEL_MESSAGE_REACTIONS: (channelId: bigint, messageId: bigint) => string;
    CHANNEL_MESSAGE_REACTION: (channelId: bigint, messageId: bigint, emoji: string, options?: GetReactions | undefined) => string;
    CHANNEL_FOLLOW: (channelId: bigint) => string;
    CHANNEL_MESSAGE_CROSSPOST: (channelId: bigint, messageId: bigint) => string;
    CHANNEL_OVERWRITE: (channelId: bigint, overwriteId: bigint) => string;
    CHANNEL_TYPING: (channelId: bigint) => string;
    THREAD_START_PUBLIC: (channelId: bigint, messageId: bigint) => string;
    THREAD_START_PRIVATE: (channelId: bigint) => string;
    THREAD_ACTIVE: (guildId: bigint) => string;
    THREAD_MEMBERS: (channelId: bigint) => string;
    THREAD_ME: (channelId: bigint) => string;
    THREAD_USER: (channelId: bigint, userId: bigint) => string;
    THREAD_ARCHIVED: (channelId: bigint) => string;
    THREAD_ARCHIVED_PUBLIC: (channelId: bigint, options?: ListArchivedThreads | undefined) => string;
    THREAD_ARCHIVED_PRIVATE: (channelId: bigint, options?: ListArchivedThreads | undefined) => string;
    THREAD_ARCHIVED_PRIVATE_JOINED: (channelId: bigint, options?: ListArchivedThreads | undefined) => string;
    FORUM_START: (channelId: bigint) => string;
    GUILD: (guildId: bigint, withCounts?: boolean | undefined) => string;
    GUILDS: () => string;
    GUILD_AUDIT_LOGS: (guildId: bigint, options?: GetGuildAuditLog | undefined) => string;
    GUILD_BAN: (guildId: bigint, userId: bigint) => string;
    GUILD_BANS: (guildId: bigint, options?: GetBans | undefined) => string;
    GUILD_BANNER: (guildId: bigint, icon: string) => string;
    GUILD_CHANNELS: (guildId: bigint) => string;
    GUILD_WIDGET: (guildId: bigint) => string;
    GUILD_WIDGET_JSON: (guildId: bigint) => string;
    GUILD_WIDGET_IMAGE: (guildId: bigint, style?: "shield" | "banner1" | "banner2" | "banner3" | "banner4" | undefined) => string;
    GUILD_EMOJI: (guildId: bigint, emojiId: bigint) => string;
    GUILD_EMOJIS: (guildId: bigint) => string;
    GUILD_ICON: (guildId: bigint, icon: string) => string;
    GUILD_INTEGRATION: (guildId: bigint, integrationId: bigint) => string;
    GUILD_INTEGRATION_SYNC: (guildId: bigint, integrationId: bigint) => string;
    GUILD_INTEGRATIONS: (guildId: bigint) => string;
    GUILD_INVITES: (guildId: bigint) => string;
    GUILD_LEAVE: (guildId: bigint) => string;
    GUILD_MEMBER: (guildId: bigint, userId: bigint) => string;
    GUILD_MEMBERS: (guildId: bigint, options?: ListGuildMembers | undefined) => string;
    GUILD_MEMBER_ROLE: (guildId: bigint, memberId: bigint, roleId: bigint) => string;
    GUILD_MEMBERS_SEARCH: (guildId: bigint, query: string, options?: {
        limit?: number | undefined;
    } | undefined) => string;
    GUILD_PRUNE: (guildId: bigint, options?: GetGuildPruneCountQuery | undefined) => string;
    GUILD_REGIONS: (guildId: bigint) => string;
    GUILD_ROLE: (guildId: bigint, roleId: bigint) => string;
    GUILD_ROLES: (guildId: bigint) => string;
    GUILD_SPLASH: (guildId: bigint, icon: string) => string;
    GUILD_VANITY_URL: (guildId: bigint) => string;
    GUILD_WEBHOOKS: (guildId: bigint) => string;
    TEMPLATE: (code: string) => string;
    GUILD_TEMPLATE: (guildId: bigint, code: string) => string;
    GUILD_TEMPLATES: (guildId: bigint) => string;
    GUILD_PREVIEW: (guildId: bigint) => string;
    UPDATE_VOICE_STATE: (guildId: bigint, userId?: bigint | undefined) => string;
    GUILD_WELCOME_SCREEN: (guildId: bigint) => string;
    GUILD_SCHEDULED_EVENTS: (guildId: bigint, withUserCount?: boolean | undefined) => string;
    GUILD_SCHEDULED_EVENT: (guildId: bigint, eventId: bigint, withUserCount?: boolean | undefined) => string;
    GUILD_SCHEDULED_EVENT_USERS: (guildId: bigint, eventId: bigint, options?: GetScheduledEventUsers | undefined) => string;
    VOICE_REGIONS: () => string;
    INVITE: (inviteCode: string, options?: GetInvite | undefined) => string;
    WEBHOOK: (webhookId: bigint, token: string, options?: {
        wait?: boolean | undefined;
        threadId?: bigint | undefined;
    } | undefined) => string;
    WEBHOOK_ID: (webhookId: bigint) => string;
    WEBHOOK_MESSAGE: (webhookId: bigint, token: string, messageId: bigint, options?: {
        threadId?: bigint | undefined;
    } | undefined) => string;
    WEBHOOK_MESSAGE_ORIGINAL: (webhookId: bigint, token: string, options?: {
        threadId?: bigint | undefined;
    } | undefined) => string;
    WEBHOOK_SLACK: (webhookId: bigint, token: string) => string;
    WEBHOOK_GITHUB: (webhookId: bigint, token: string) => string;
    COMMANDS: (applicationId: bigint) => string;
    COMMANDS_GUILD: (applicationId: bigint, guildId: bigint) => string;
    COMMANDS_PERMISSIONS: (applicationId: bigint, guildId: bigint) => string;
    COMMANDS_PERMISSION: (applicationId: bigint, guildId: bigint, commandId: bigint) => string;
    COMMANDS_ID: (applicationId: bigint, commandId: bigint, withLocalizations?: boolean | undefined) => string;
    COMMANDS_GUILD_ID: (applicationId: bigint, guildId: bigint, commandId: bigint, withLocalizations?: boolean | undefined) => string;
    INTERACTION_ID_TOKEN: (interactionId: bigint, token: string) => string;
    INTERACTION_ORIGINAL_ID_TOKEN: (interactionId: bigint, token: string) => string;
    INTERACTION_ID_TOKEN_MESSAGE_ID: (applicationId: bigint, token: string, messageId: bigint) => string;
    USER: (userId: bigint) => string;
    USER_BOT: () => string;
    USER_GUILDS: () => string;
    USER_AVATAR: (userId: bigint, icon: string) => string;
    USER_DEFAULT_AVATAR: (icon: number) => string;
    USER_DM: () => string;
    USER_CONNECTIONS: () => string;
    USER_NICK: (guildId: bigint) => string;
    DISCOVERY_CATEGORIES: () => string;
    DISCOVERY_VALID_TERM: (term: string) => string;
    DISCOVERY_METADATA: (guildId: bigint) => string;
    DISCOVERY_SUBCATEGORY: (guildId: bigint, categoryId: number) => string;
    OAUTH2_APPLICATION: () => string;
    STAGE_INSTANCES: () => string;
    STAGE_INSTANCE: (channelId: bigint) => string;
    NITRO_STICKER_PACKS: () => string;
};
