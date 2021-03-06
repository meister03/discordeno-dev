import { createRestManager } from "./rest/mod.js";
import { bigintToSnowflake, snowflakeToBigint } from "./util/bigint.js";
import { transformChannel, transformGuild, transformMember, transformMessage, transformRole, transformTemplate, transformUser, transformVoiceState, } from "./transformers/mod.js";
import { baseEndpoints, CHANNEL_MENTION_REGEX, CONTEXT_MENU_COMMANDS_NAME_REGEX, DISCORD_SNOWFLAKE_REGEX, DISCORDENO_VERSION, SLASH_COMMANDS_NAME_REGEX, USER_AGENT, } from "./util/constants.js";
import { createGatewayManager } from "./gateway/manager/gatewayManager.js";
import { validateLength } from "./util/validateLength.js";
import { delay, formatImageURL } from "./util/utils.js";
import { iconBigintToHash, iconHashToBigInt } from "./util/hash.js";
import { calculateShardId } from "./util/calculateShardId.js";
import * as handlers from "./handlers/mod.js";
import { transformInteraction, transformInteractionDataOption, } from "./transformers/interaction.js";
import { transformIntegration } from "./transformers/integration.js";
import { transformApplication } from "./transformers/application.js";
import { transformTeam } from "./transformers/team.js";
import { transformInvite } from "./transformers/invite.js";
import * as helpers from "./helpers/mod.js";
import { transformEmoji } from "./transformers/emoji.js";
import { transformActivity } from "./transformers/activity.js";
import { transformPresence } from "./transformers/presence.js";
import { urlToBase64 } from "./util/urlToBase64.js";
import { transformAttachment } from "./transformers/attachment.js";
import { transformEmbed } from "./transformers/embed.js";
import { transformComponent } from "./transformers/component.js";
import { transformWebhook } from "./transformers/webhook.js";
import { transformAuditLogEntry } from "./transformers/auditLogEntry.js";
import { transformApplicationCommandPermission } from "./transformers/applicationCommandPermission.js";
import { calculateBits, calculatePermissions } from "./util/permissions.js";
import { transformScheduledEvent } from "./transformers/scheduledEvent.js";
import { transformThreadMember } from "./transformers/threadMember.js";
import { transformApplicationCommandOption } from "./transformers/applicationCommandOption.js";
import { transformApplicationCommand } from "./transformers/applicationCommand.js";
import { transformWelcomeScreen } from "./transformers/welcomeScreen.js";
import { transformVoiceRegion } from "./transformers/voiceRegion.js";
import { transformWidget } from "./transformers/widget.js";
import { transformWidgetSettings } from "./transformers/widgetSettings.js";
import { transformStageInstance } from "./transformers/stageInstance.js";
import { transformSticker, transformStickerPack } from "./transformers/sticker.js";
import { transformGatewayBot } from "./transformers/gatewayBot.js";
import { Errors } from "./types/shared.js";
import { transformApplicationCommandOptionChoice, } from "./transformers/applicationCommandOptionChoice.js";
import { transformEmbedToDiscordEmbed } from "./transformers/reverse/embed.js";
import { transformComponentToDiscordComponent } from "./transformers/reverse/component.js";
import { transformActivityToDiscordActivity } from "./transformers/reverse/activity.js";
import { transformTeamToDiscordTeam } from "./transformers/reverse/team.js";
import { transformMemberToDiscordMember, transformUserToDiscordUser } from "./transformers/reverse/member.js";
import { transformApplicationToDiscordApplication } from "./transformers/reverse/application.js";
import { getBotIdFromToken, removeTokenPrefix } from "./util/token.js";
import { transformAutoModerationRule } from "./transformers/automodRule.js";
import { transformAutoModerationActionExecution, } from "./transformers/automodActionExecution.js";
import { routes } from "./util/routes.js";
import { transformAllowedMentionsToDiscordAllowedMentions } from "./transformers/reverse/allowedMentions.js";
export function createBot(options) {
    const bot = {
        id: options.botId ?? getBotIdFromToken(options.token),
        applicationId: options.applicationId || options.botId,
        token: removeTokenPrefix(options.token),
        events: createEventHandlers(options.events ?? {}),
        intents: options.intents,
        botGatewayData: options.botGatewayData,
        activeGuildIds: new Set(),
        constants: createBotConstants(),
        handlers: createBotGatewayHandlers({}),
        utils: createUtils(options.utils ?? {}),
        transformers: createTransformers(options.transformers ?? {}),
        enabledPlugins: new Set(),
        handleDiscordPayload: options.handleDiscordPayload,
        cache: {
            unrepliedInteractions: new Set(),
            fetchAllMembersProcessingRequests: new Map(),
        },
        rest: createRestManager({
            token: options.token,
            debug: options.events?.debug,
            secretKey: options.secretKey ?? undefined,
        }),
    };
    bot.helpers = createHelpers(bot, options.helpers ?? {});
    bot.gateway = createGatewayManager({
        gatewayBot: bot.botGatewayData ?? {},
        gatewayConfig: {
            token: options.token,
            intents: options.intents,
        },
        debug: bot.events.debug,
        handleDiscordPayload: bot.handleDiscordPayload ??
            async function (shard, data) {
                // TRIGGER RAW EVENT
                bot.events.raw(bot, data, shard.id);
                if (!data.t)
                    return;
                // RUN DISPATCH CHECK
                await bot.events.dispatchRequirements(bot, data, shard.id);
                bot.handlers[data.t]?.(bot, data, shard.id);
            },
    });
    return bot;
}
export function createEventHandlers(events) {
    function ignore() { }
    return {
        debug: events.debug ?? ignore,
        automodRuleCreate: events.automodRuleCreate ?? ignore,
        automodRuleUpdate: events.automodRuleUpdate ?? ignore,
        automodRuleDelete: events.automodRuleDelete ?? ignore,
        automodActionExecution: events.automodActionExecution ?? ignore,
        threadCreate: events.threadCreate ?? ignore,
        threadDelete: events.threadDelete ?? ignore,
        threadMemberUpdate: events.threadMemberUpdate ?? ignore,
        threadMembersUpdate: events.threadMembersUpdate ?? ignore,
        threadUpdate: events.threadUpdate ?? ignore,
        scheduledEventCreate: events.scheduledEventCreate ?? ignore,
        scheduledEventUpdate: events.scheduledEventUpdate ?? ignore,
        scheduledEventDelete: events.scheduledEventDelete ?? ignore,
        scheduledEventUserAdd: events.scheduledEventUserAdd ?? ignore,
        scheduledEventUserRemove: events.scheduledEventUserRemove ?? ignore,
        ready: events.ready ?? ignore,
        dispatchRequirements: events.dispatchRequirements ?? ignore,
        integrationCreate: events.integrationCreate ?? ignore,
        integrationDelete: events.integrationDelete ?? ignore,
        integrationUpdate: events.integrationUpdate ?? ignore,
        interactionCreate: events.interactionCreate ?? ignore,
        inviteCreate: events.inviteCreate ?? ignore,
        inviteDelete: events.inviteDelete ?? ignore,
        guildMemberAdd: events.guildMemberAdd ?? ignore,
        guildMemberRemove: events.guildMemberRemove ?? ignore,
        guildMemberUpdate: events.guildMemberUpdate ?? ignore,
        messageCreate: events.messageCreate ?? ignore,
        messageDelete: events.messageDelete ?? ignore,
        messageDeleteBulk: events.messageDeleteBulk ?? ignore,
        messageUpdate: events.messageUpdate ?? ignore,
        reactionAdd: events.reactionAdd ?? ignore,
        reactionRemove: events.reactionRemove ?? ignore,
        reactionRemoveAll: events.reactionRemoveAll ?? ignore,
        reactionRemoveEmoji: events.reactionRemoveEmoji ?? ignore,
        presenceUpdate: events.presenceUpdate ?? ignore,
        voiceServerUpdate: events.voiceServerUpdate ?? ignore,
        voiceStateUpdate: events.voiceStateUpdate ?? ignore,
        channelCreate: events.channelCreate ?? ignore,
        channelDelete: events.channelDelete ?? ignore,
        channelPinsUpdate: events.channelPinsUpdate ?? ignore,
        channelUpdate: events.channelUpdate ?? ignore,
        guildEmojisUpdate: events.guildEmojisUpdate ?? ignore,
        guildBanAdd: events.guildBanAdd ?? ignore,
        guildBanRemove: events.guildBanRemove ?? ignore,
        guildLoaded: events.guildLoaded ?? ignore,
        guildCreate: events.guildCreate ?? ignore,
        guildDelete: events.guildDelete ?? ignore,
        guildUpdate: events.guildUpdate ?? ignore,
        raw: events.raw ?? ignore,
        stageInstanceCreate: events.stageInstanceCreate ?? ignore,
        stageInstanceDelete: events.stageInstanceDelete ?? ignore,
        stageInstanceUpdate: events.stageInstanceUpdate ?? ignore,
        roleCreate: events.roleCreate ?? ignore,
        roleDelete: events.roleDelete ?? ignore,
        roleUpdate: events.roleUpdate ?? ignore,
        webhooksUpdate: events.webhooksUpdate ?? ignore,
        botUpdate: events.botUpdate ?? ignore,
        typingStart: events.typingStart ?? ignore,
    };
}
export async function startBot(bot) {
    if (!Object.keys(bot.botGatewayData ?? {}).length) {
        bot.gateway.gatewayBot = await bot.helpers.getGatewayBot();
        bot.gateway.lastShardId = bot.gateway.gatewayBot.shards - 1;
        bot.gateway.manager.totalShards = bot.gateway.gatewayBot.shards;
    }
    bot.gateway.spawnShards();
}
export function createUtils(options) {
    return {
        snowflakeToBigint,
        bigintToSnowflake,
        calculateShardId,
        delay,
        iconHashToBigInt,
        iconBigintToHash,
        validateLength,
        urlToBase64,
        formatImageURL,
        calculateBits,
        calculatePermissions,
    };
}
export async function stopBot(bot) {
    await bot.gateway.stop(1000, "User requested bot stop");
    return bot;
}
export const defaultHelpers = { ...helpers };
export function createHelpers(bot, customHelpers) {
    const converted = {};
    for (const [name, fun] of Object.entries({
        ...createBaseHelpers(customHelpers || {}),
    })) {
        // @ts-ignore - TODO: make the types better
        converted[name] = (
        // @ts-ignore - TODO: make the types better
        ...args) => 
        // @ts-ignore - TODO: make the types better
        fun(bot, ...args);
    }
    return converted;
}
export function createBaseHelpers(options) {
    return {
        ...defaultHelpers,
        ...options,
    };
}
export function createTransformers(options) {
    return {
        reverse: {
            allowedMentions: options.reverse?.allowedMentions || transformAllowedMentionsToDiscordAllowedMentions,
            embed: options.reverse?.embed || transformEmbedToDiscordEmbed,
            component: options.reverse?.component || transformComponentToDiscordComponent,
            activity: options.reverse?.activity || transformActivityToDiscordActivity,
            member: options.reverse?.member || transformMemberToDiscordMember,
            user: options.reverse?.user || transformUserToDiscordUser,
            team: options.reverse?.team || transformTeamToDiscordTeam,
            application: options.reverse?.application || transformApplicationToDiscordApplication,
        },
        automodRule: options.automodRule || transformAutoModerationRule,
        automodActionExecution: options.automodActionExecution || transformAutoModerationActionExecution,
        activity: options.activity || transformActivity,
        application: options.application || transformApplication,
        attachment: options.attachment || transformAttachment,
        channel: options.channel || transformChannel,
        component: options.component || transformComponent,
        embed: options.embed || transformEmbed,
        emoji: options.emoji || transformEmoji,
        guild: options.guild || transformGuild,
        integration: options.integration || transformIntegration,
        interaction: options.interaction || transformInteraction,
        interactionDataOptions: options.interactionDataOptions || transformInteractionDataOption,
        invite: options.invite || transformInvite,
        member: options.member || transformMember,
        message: options.message || transformMessage,
        presence: options.presence || transformPresence,
        role: options.role || transformRole,
        user: options.user || transformUser,
        team: options.team || transformTeam,
        voiceState: options.voiceState || transformVoiceState,
        snowflake: options.snowflake || snowflakeToBigint,
        webhook: options.webhook || transformWebhook,
        auditLogEntry: options.auditLogEntry || transformAuditLogEntry,
        applicationCommand: options.applicationCommand ||
            transformApplicationCommand,
        applicationCommandOption: options.applicationCommandOption ||
            transformApplicationCommandOption,
        applicationCommandPermission: options.applicationCommandPermission ||
            transformApplicationCommandPermission,
        scheduledEvent: options.scheduledEvent || transformScheduledEvent,
        threadMember: options.threadMember || transformThreadMember,
        welcomeScreen: options.welcomeScreen || transformWelcomeScreen,
        voiceRegion: options.voiceRegion || transformVoiceRegion,
        widget: options.widget || transformWidget,
        widgetSettings: options.widgetSettings || transformWidgetSettings,
        stageInstance: options.stageInstance || transformStageInstance,
        sticker: options.sticker || transformSticker,
        stickerPack: options.stickerPack || transformStickerPack,
        gatewayBot: options.gatewayBot || transformGatewayBot,
        applicationCommandOptionChoice: options.applicationCommandOptionChoice || transformApplicationCommandOptionChoice,
        template: options.template || transformTemplate,
    };
}
export function createBotConstants() {
    return {
        DISCORDENO_VERSION,
        USER_AGENT,
        BASE_URL: baseEndpoints.BASE_URL,
        CDN_URL: baseEndpoints.CDN_URL,
        routes,
        regexes: {
            SLASH_COMMANDS_NAME_REGEX,
            CONTEXT_MENU_COMMANDS_NAME_REGEX,
            CHANNEL_MENTION_REGEX,
            DISCORD_SNOWFLAKE_REGEX,
        },
        Errors,
    };
}
export function createBotGatewayHandlers(options) {
    return {
        // misc
        READY: options.READY ?? handlers.handleReady,
        // channels
        CHANNEL_CREATE: options.CHANNEL_CREATE ?? handlers.handleChannelCreate,
        CHANNEL_DELETE: options.CHANNEL_DELETE ?? handlers.handleChannelDelete,
        CHANNEL_PINS_UPDATE: options.CHANNEL_PINS_UPDATE ??
            handlers.handleChannelPinsUpdate,
        CHANNEL_UPDATE: options.CHANNEL_UPDATE ?? handlers.handleChannelUpdate,
        THREAD_CREATE: options.THREAD_CREATE ?? handlers.handleThreadCreate,
        THREAD_UPDATE: options.THREAD_UPDATE ?? handlers.handleThreadUpdate,
        THREAD_DELETE: options.THREAD_DELETE ?? handlers.handleThreadDelete,
        THREAD_LIST_SYNC: options.THREAD_LIST_SYNC ?? handlers.handleThreadListSync,
        THREAD_MEMBERS_UPDATE: options.THREAD_MEMBERS_UPDATE ?? handlers.handleThreadMembersUpdate,
        STAGE_INSTANCE_CREATE: options.STAGE_INSTANCE_CREATE ??
            handlers.handleStageInstanceCreate,
        STAGE_INSTANCE_UPDATE: options.STAGE_INSTANCE_UPDATE ??
            handlers.handleStageInstanceUpdate,
        STAGE_INSTANCE_DELETE: options.STAGE_INSTANCE_DELETE ??
            handlers.handleStageInstanceDelete,
        // guilds
        GUILD_BAN_ADD: options.GUILD_BAN_ADD ?? handlers.handleGuildBanAdd,
        GUILD_BAN_REMOVE: options.GUILD_BAN_REMOVE ?? handlers.handleGuildBanRemove,
        GUILD_CREATE: options.GUILD_CREATE ?? handlers.handleGuildCreate,
        GUILD_LOADED_DD: options.GUILD_LOADED_DD ?? handlers.handleGuildLoaded,
        GUILD_DELETE: options.GUILD_DELETE ?? handlers.handleGuildDelete,
        GUILD_EMOJIS_UPDATE: options.GUILD_EMOJIS_UPDATE ??
            handlers.handleGuildEmojisUpdate,
        GUILD_INTEGRATIONS_UPDATE: options.GUILD_INTEGRATIONS_UPDATE ??
            handlers.handleGuildIntegrationsUpdate,
        GUILD_MEMBER_ADD: options.GUILD_MEMBER_ADD ?? handlers.handleGuildMemberAdd,
        GUILD_MEMBER_REMOVE: options.GUILD_MEMBER_REMOVE ??
            handlers.handleGuildMemberRemove,
        GUILD_MEMBER_UPDATE: options.GUILD_MEMBER_UPDATE ??
            handlers.handleGuildMemberUpdate,
        GUILD_MEMBERS_CHUNK: options.GUILD_MEMBERS_CHUNK ??
            handlers.handleGuildMembersChunk,
        GUILD_ROLE_CREATE: options.GUILD_ROLE_CREATE ??
            handlers.handleGuildRoleCreate,
        GUILD_ROLE_DELETE: options.GUILD_ROLE_DELETE ??
            handlers.handleGuildRoleDelete,
        GUILD_ROLE_UPDATE: options.GUILD_ROLE_UPDATE ??
            handlers.handleGuildRoleUpdate,
        GUILD_UPDATE: options.GUILD_UPDATE ?? handlers.handleGuildUpdate,
        // guild events
        GUILD_SCHEDULED_EVENT_CREATE: options.GUILD_SCHEDULED_EVENT_CREATE ??
            handlers.handleGuildScheduledEventCreate,
        GUILD_SCHEDULED_EVENT_DELETE: options.GUILD_SCHEDULED_EVENT_DELETE ??
            handlers.handleGuildScheduledEventDelete,
        GUILD_SCHEDULED_EVENT_UPDATE: options.GUILD_SCHEDULED_EVENT_UPDATE ??
            handlers.handleGuildScheduledEventUpdate,
        GUILD_SCHEDULED_EVENT_USER_ADD: options.GUILD_SCHEDULED_EVENT_USER_ADD ??
            handlers.handleGuildScheduledEventUserAdd,
        GUILD_SCHEDULED_EVENT_USER_REMOVE: options.GUILD_SCHEDULED_EVENT_USER_REMOVE ??
            handlers.handleGuildScheduledEventUserRemove,
        // interactions
        INTERACTION_CREATE: options.INTERACTION_CREATE ??
            handlers.handleInteractionCreate,
        // invites
        INVITE_CREATE: options.INVITE_CREATE ?? handlers.handleInviteCreate,
        INVITE_DELETE: options.INVITE_DELETE ?? handlers.handleInviteCreate,
        // messages
        MESSAGE_CREATE: options.MESSAGE_CREATE ?? handlers.handleMessageCreate,
        MESSAGE_DELETE_BULK: options.MESSAGE_DELETE_BULK ??
            handlers.handleMessageDeleteBulk,
        MESSAGE_DELETE: options.MESSAGE_DELETE ?? handlers.handleMessageDelete,
        MESSAGE_REACTION_ADD: options.MESSAGE_REACTION_ADD ??
            handlers.handleMessageReactionAdd,
        MESSAGE_REACTION_REMOVE_ALL: options.MESSAGE_REACTION_REMOVE_ALL ??
            handlers.handleMessageReactionRemoveAll,
        MESSAGE_REACTION_REMOVE_EMOJI: options.MESSAGE_REACTION_REMOVE_EMOJI ??
            handlers.handleMessageReactionRemoveEmoji,
        MESSAGE_REACTION_REMOVE: options.MESSAGE_REACTION_REMOVE ??
            handlers.handleMessageReactionRemove,
        MESSAGE_UPDATE: options.MESSAGE_UPDATE ?? handlers.handleMessageUpdate,
        // presence
        PRESENCE_UPDATE: options.PRESENCE_UPDATE ?? handlers.handlePresenceUpdate,
        TYPING_START: options.TYPING_START ?? handlers.handleTypingStart,
        USER_UPDATE: options.USER_UPDATE ?? handlers.handleUserUpdate,
        // voice
        VOICE_SERVER_UPDATE: options.VOICE_SERVER_UPDATE ??
            handlers.handleVoiceServerUpdate,
        VOICE_STATE_UPDATE: options.VOICE_STATE_UPDATE ??
            handlers.handleVoiceStateUpdate,
        // webhooks
        WEBHOOKS_UPDATE: options.WEBHOOKS_UPDATE ?? handlers.handleWebhooksUpdate,
        // integrations
        INTEGRATION_CREATE: options.INTEGRATION_CREATE ??
            handlers.handleIntegrationCreate,
        INTEGRATION_UPDATE: options.INTEGRATION_UPDATE ??
            handlers.handleIntegrationUpdate,
        INTEGRATION_DELETE: options.INTEGRATION_DELETE ??
            handlers.handleIntegrationDelete,
    };
}
