import { isGetMessagesAfter, isGetMessagesAround, isGetMessagesBefore, isGetMessagesLimit, } from "../helpers/messages/getMessages.js";
import { baseEndpoints } from "./constants.js";
export const routes = {
    GATEWAY_BOT: () => {
        return `/gateway/bot`;
    },
    // Automod Endpoints
    AUTOMOD_RULES: (guildId) => {
        return `/guilds/${guildId}/auto-moderation/rules`;
    },
    AUTOMOD_RULE: (guildId, ruleId) => {
        return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
    },
    // Channel Endpoints
    CHANNEL: (channelId) => {
        return `/channels/${channelId}`;
    },
    CHANNEL_MESSAGE: (channelId, messageId) => {
        return `/channels/${channelId}/messages/${messageId}`;
    },
    CHANNEL_MESSAGES: (channelId, options) => {
        let url = `/channels/${channelId}/messages?`;
        if (options) {
            if (isGetMessagesAfter(options) && options.after)
                url += `after=${options.after}`;
            if (isGetMessagesBefore(options) && options.before)
                url += `&before=${options.before}`;
            if (isGetMessagesAround(options) && options.around)
                url += `&around=${options.around}`;
            if (isGetMessagesLimit(options) && options.limit)
                url += `&limit=${options.limit}`;
        }
        return url;
    },
    CHANNEL_PIN: (channelId, messageId) => {
        return `/channels/${channelId}/pins/${messageId}`;
    },
    CHANNEL_PINS: (channelId) => {
        return `/channels/${channelId}/pins`;
    },
    CHANNEL_BULK_DELETE: (channelId) => {
        return `/channels/${channelId}/messages/bulk-delete`;
    },
    CHANNEL_INVITES: (channelId) => {
        return `/channels/${channelId}/invites`;
    },
    CHANNEL_WEBHOOKS: (channelId) => {
        return `/channels/${channelId}/webhooks`;
    },
    CHANNEL_MESSAGE_REACTION_ME: (channelId, messageId, emoji) => {
        return `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`;
    },
    CHANNEL_MESSAGE_REACTION_USER: (channelId, messageId, emoji, userId) => {
        return `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/${userId}`;
    },
    CHANNEL_MESSAGE_REACTIONS: (channelId, messageId) => {
        return `/channels/${channelId}/messages/${messageId}/reactions`;
    },
    CHANNEL_MESSAGE_REACTION: (channelId, messageId, emoji, options) => {
        let url = `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}?`;
        if (options) {
            if (options.after)
                url += `after=${options.after}`;
            if (options.limit)
                url += `&limit=${options.limit}`;
        }
        return url;
    },
    CHANNEL_FOLLOW: (channelId) => {
        return `/channels/${channelId}/followers`;
    },
    CHANNEL_MESSAGE_CROSSPOST: (channelId, messageId) => {
        return `/channels/${channelId}/messages/${messageId}/crosspost`;
    },
    CHANNEL_OVERWRITE: (channelId, overwriteId) => {
        return `/channels/${channelId}/permissions/${overwriteId}`;
    },
    // Bots SHALL NOT use this endpoint but they can
    CHANNEL_TYPING: (channelId) => {
        return `/channels/${channelId}/typing`;
    },
    // Thread Endpoints
    THREAD_START_PUBLIC: (channelId, messageId) => {
        return `/channels/${channelId}/messages/${messageId}/threads`;
    },
    THREAD_START_PRIVATE: (channelId) => {
        return `/channels/${channelId}/threads`;
    },
    THREAD_ACTIVE: (guildId) => {
        return `/guilds/${guildId}/threads/active`;
    },
    THREAD_MEMBERS: (channelId) => {
        return `/channels/${channelId}/thread-members`;
    },
    THREAD_ME: (channelId) => {
        return `/channels/${channelId}/thread-members/@me`;
    },
    THREAD_USER: (channelId, userId) => {
        return `/channels/${channelId}/thread-members/${userId}`;
    },
    THREAD_ARCHIVED: (channelId) => {
        return `/channels/${channelId}/threads/archived`;
    },
    THREAD_ARCHIVED_PUBLIC: (channelId, options) => {
        let url = `/channels/${channelId}/threads/archived/public?`;
        if (options) {
            if (options.before)
                url += `before=${new Date(options.before).toISOString()}`;
            if (options.limit)
                url += `&limit=${options.limit}`;
        }
        return url;
    },
    THREAD_ARCHIVED_PRIVATE: (channelId, options) => {
        let url = `/channels/${channelId}/threads/archived/private?`;
        if (options) {
            if (options.before)
                url += `before=${new Date(options.before).toISOString()}`;
            if (options.limit)
                url += `&limit=${options.limit}`;
        }
        return url;
    },
    THREAD_ARCHIVED_PRIVATE_JOINED: (channelId, options) => {
        let url = `/channels/${channelId}/users/@me/threads/archived/private?`;
        if (options) {
            if (options.before)
                url += `before=${new Date(options.before).toISOString()}`;
            if (options.limit)
                url += `&limit=${options.limit}`;
        }
        return url;
    },
    // Thread -> Forum Endpoints
    FORUM_START: (channelId) => {
        return `/channels/${channelId}/threads?has_message=true`;
    },
    // Guild Endpoints
    GUILD: (guildId, withCounts) => {
        let url = `/guilds/${guildId}?`;
        if (withCounts !== undefined) {
            url += `with_counts=${withCounts}`;
        }
        return url;
    },
    GUILDS: () => {
        return `/guilds`;
    },
    GUILD_AUDIT_LOGS: (guildId, options) => {
        let url = `/guilds/${guildId}/audit-logs?`;
        if (options) {
            if (options.actionType)
                url += `action_type=${options.actionType}`;
            if (options.before)
                url += `&before=${options.before}`;
            if (options.limit)
                url += `&limit=${options.limit}`;
            if (options.userId)
                url += `&user_id=${options.userId}`;
        }
        return url;
    },
    GUILD_BAN: (guildId, userId) => {
        return `/guilds/${guildId}/bans/${userId}`;
    },
    GUILD_BANS: (guildId, options) => {
        let url = `/guilds/${guildId}/bans?`;
        if (options) {
            if (options.limit)
                url += `limit=${options.limit}`;
            if (options.after)
                url += `&after=${options.after}`;
            if (options.before)
                url += `&before=${options.before}`;
        }
        return url;
    },
    // TODO: move this away
    GUILD_BANNER: (guildId, icon) => {
        return `${baseEndpoints.CDN_URL}/banners/${guildId}/${icon}`;
    },
    GUILD_CHANNELS: (guildId) => {
        return `/guilds/${guildId}/channels`;
    },
    GUILD_WIDGET: (guildId) => {
        return `/guilds/${guildId}/widget`;
    },
    GUILD_WIDGET_JSON: (guildId) => {
        return `/guilds/${guildId}/widget.json`;
    },
    GUILD_WIDGET_IMAGE: (guildId, style) => {
        let url = `/guilds/${guildId}/widget.png?`;
        if (style) {
            url += `style=${style}`;
        }
        return url;
    },
    GUILD_EMOJI: (guildId, emojiId) => {
        return `/guilds/${guildId}/emojis/${emojiId}`;
    },
    GUILD_EMOJIS: (guildId) => {
        return `/guilds/${guildId}/emojis`;
    },
    // TODO: move this away
    GUILD_ICON: (guildId, icon) => {
        return `${baseEndpoints.CDN_URL}/icons/${guildId}/${icon}`;
    },
    GUILD_INTEGRATION: (guildId, integrationId) => {
        return `/guilds/${guildId}/integrations/${integrationId}`;
    },
    GUILD_INTEGRATION_SYNC: (guildId, integrationId) => {
        return `/guilds/${guildId}/integrations/${integrationId}/sync`;
    },
    GUILD_INTEGRATIONS: (guildId) => {
        return `/guilds/${guildId}/integrations?include_applications=true`;
    },
    GUILD_INVITES: (guildId) => {
        return `/guilds/${guildId}/invites`;
    },
    GUILD_LEAVE: (guildId) => {
        return `/users/@me/guilds/${guildId}`;
    },
    GUILD_MEMBER: (guildId, userId) => {
        return `/guilds/${guildId}/members/${userId}`;
    },
    GUILD_MEMBERS: (guildId, options) => {
        let url = `/guilds/${guildId}/members?`;
        if (options !== undefined) {
            if (options.limit)
                url += `limit=${options.limit}`;
            if (options.after)
                url += `&after=${options.after}`;
        }
        return url;
    },
    GUILD_MEMBER_ROLE: (guildId, memberId, roleId) => {
        return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
    },
    GUILD_MEMBERS_SEARCH: (guildId, query, options) => {
        let url = `/guilds/${guildId}/members/search?query=${encodeURIComponent(query)}`;
        if (options) {
            if (options.limit !== undefined)
                url += `&limit=${options.limit}`;
        }
        return url;
    },
    GUILD_PRUNE: (guildId, options) => {
        let url = `/guilds/${guildId}/prune?`;
        if (options) {
            if (options.days)
                url += `days=${options.days}`;
            if (options.includeRoles)
                url += `&include_roles=${options.includeRoles}`;
        }
        return url;
    },
    GUILD_REGIONS: (guildId) => {
        return `/guilds/${guildId}/regions`;
    },
    GUILD_ROLE: (guildId, roleId) => {
        return `/guilds/${guildId}/roles/${roleId}`;
    },
    GUILD_ROLES: (guildId) => {
        return `/guilds/${guildId}/roles`;
    },
    // TODO: move this away
    GUILD_SPLASH: (guildId, icon) => {
        return `${baseEndpoints.CDN_URL}/splashes/${guildId}/${icon}`;
    },
    GUILD_VANITY_URL: (guildId) => {
        return `/guilds/${guildId}/vanity-url`;
    },
    GUILD_WEBHOOKS: (guildId) => {
        return `/guilds/${guildId}/webhooks`;
    },
    TEMPLATE: (code) => {
        return `/guilds/templates/${code}`;
    },
    GUILD_TEMPLATE: (guildId, code) => {
        return `/guilds/${guildId}/templates/${code}`;
    },
    GUILD_TEMPLATES: (guildId) => {
        return `/guilds/${guildId}/templates`;
    },
    GUILD_PREVIEW: (guildId) => {
        return `/guilds/${guildId}/preview`;
    },
    UPDATE_VOICE_STATE: (guildId, userId) => {
        return `/guilds/${guildId}/voice-states/${userId ?? "@me"}`;
    },
    GUILD_WELCOME_SCREEN: (guildId) => {
        return `/guilds/${guildId}/welcome-screen`;
    },
    GUILD_SCHEDULED_EVENTS: (guildId, withUserCount) => {
        let url = `/guilds/${guildId}/scheduled-events?`;
        if (withUserCount !== undefined) {
            url += `with_user_count=${withUserCount}`;
        }
        return url;
    },
    GUILD_SCHEDULED_EVENT: (guildId, eventId, withUserCount) => {
        let url = `/guilds/${guildId}/scheduled-events/${eventId}`;
        if (withUserCount !== undefined) {
            url += `with_user_count=${withUserCount}`;
        }
        return url;
    },
    GUILD_SCHEDULED_EVENT_USERS: (guildId, eventId, options) => {
        let url = `/guilds/${guildId}/scheduled-events/${eventId}/users?`;
        if (options) {
            if (options.limit)
                url += `limit=${options.limit}`;
            if (options.withMember)
                url += `&with_member=${options.withMember}`;
            if (options.after)
                url += `&after=${options.after}`;
            if (options.before)
                url += `&before=${options.before}`;
        }
        return url;
    },
    // Voice
    VOICE_REGIONS: () => {
        return `/voice/regions`;
    },
    INVITE: (inviteCode, options) => {
        let url = `/invites/${inviteCode}?`;
        if (options) {
            if (options.withCounts)
                url += `with_counts=${options.withCounts}`;
            if (options.withExpiration)
                url += `&with_expiration=${options.withExpiration}`;
            if (options.scheduledEventId)
                url += `&guild_scheduled_event_id=${options.scheduledEventId}`;
        }
        return url;
    },
    WEBHOOK: (webhookId, token, options) => {
        let url = `/webhooks/${webhookId}/${token}?`;
        if (options) {
            if (options?.wait !== undefined)
                url += `wait=${options.wait}`;
            if (options.threadId)
                url += `threadId=${options.threadId}`;
        }
        return url;
    },
    WEBHOOK_ID: (webhookId) => {
        return `/webhooks/${webhookId}`;
    },
    WEBHOOK_MESSAGE: (webhookId, token, messageId, options) => {
        let url = `/webhooks/${webhookId}/${token}/messages/${messageId}?`;
        if (options) {
            if (options.threadId)
                url += `threadId=${options.threadId}`;
        }
        return url;
    },
    WEBHOOK_MESSAGE_ORIGINAL: (webhookId, token, options) => {
        let url = `/webhooks/${webhookId}/${token}/messages/@original?`;
        if (options) {
            if (options.threadId)
                url += `threadId=${options.threadId}`;
        }
        return url;
    },
    WEBHOOK_SLACK: (webhookId, token) => {
        return `/webhooks/${webhookId}/${token}/slack`;
    },
    WEBHOOK_GITHUB: (webhookId, token) => {
        return `/webhooks/${webhookId}/${token}/github`;
    },
    // Application Endpoints
    COMMANDS: (applicationId) => {
        return `/applications/${applicationId}/commands`;
    },
    COMMANDS_GUILD: (applicationId, guildId) => {
        return `/applications/${applicationId}/guilds/${guildId}/commands`;
    },
    COMMANDS_PERMISSIONS: (applicationId, guildId) => {
        return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
    },
    COMMANDS_PERMISSION: (applicationId, guildId, commandId) => {
        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
    },
    COMMANDS_ID: (applicationId, commandId, withLocalizations) => {
        let url = `/applications/${applicationId}/commands/${commandId}?`;
        if (withLocalizations !== undefined) {
            url += `withLocalizations=${withLocalizations}`;
        }
        return url;
    },
    COMMANDS_GUILD_ID: (applicationId, guildId, commandId, withLocalizations) => {
        let url = `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}?`;
        if (withLocalizations !== undefined) {
            url += `with_localizations=${withLocalizations}`;
        }
        return url;
    },
    // Interaction Endpoints
    INTERACTION_ID_TOKEN: (interactionId, token) => {
        return `/interactions/${interactionId}/${token}/callback`;
    },
    INTERACTION_ORIGINAL_ID_TOKEN: (interactionId, token) => {
        return `/webhooks/${interactionId}/${token}/messages/@original`;
    },
    INTERACTION_ID_TOKEN_MESSAGE_ID: (applicationId, token, messageId) => {
        return `/webhooks/${applicationId}/${token}/messages/${messageId}`;
    },
    // User endpoints
    USER: (userId) => {
        return `/users/${userId}`;
    },
    USER_BOT: () => {
        return `/users/@me`;
    },
    USER_GUILDS: () => {
        return `/users/@me/guilds`;
    },
    // TODO: move this away
    USER_AVATAR: (userId, icon) => {
        return `${baseEndpoints.CDN_URL}/avatars/${userId}/${icon}`;
    },
    // TODO: move this away
    USER_DEFAULT_AVATAR: (icon) => {
        return `${baseEndpoints.CDN_URL}/embed/avatars/${icon}.png`;
    },
    USER_DM: () => {
        return `/users/@me/channels`;
    },
    USER_CONNECTIONS: () => {
        return `/users/@me/connections`;
    },
    USER_NICK: (guildId) => {
        return `/guilds/${guildId}/members/@me`;
    },
    // Discovery Endpoints
    DISCOVERY_CATEGORIES: () => {
        return `/discovery/categories`;
    },
    DISCOVERY_VALID_TERM: (term) => {
        return `/discovery/valid-term?term=${term}`;
    },
    DISCOVERY_METADATA: (guildId) => {
        return `/guilds/${guildId}/discovery-metadata`;
    },
    DISCOVERY_SUBCATEGORY: (guildId, categoryId) => {
        return `/guilds/${guildId}/discovery-categories/${categoryId}`;
    },
    // OAuth2
    OAUTH2_APPLICATION: () => {
        return `/oauth2/applications/@me`;
    },
    // Stage instances
    STAGE_INSTANCES: () => {
        return `/stage-instances`;
    },
    STAGE_INSTANCE: (channelId) => {
        return `/stage-instances/${channelId}`;
    },
    // Misc Endpoints
    NITRO_STICKER_PACKS: () => {
        return `/sticker-packs`;
    },
};
