"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBotGatewayHandlers = exports.createBotConstants = exports.createTransformers = exports.createBaseHelpers = exports.createHelpers = exports.defaultHelpers = exports.stopBot = exports.createUtils = exports.startBot = exports.createEventHandlers = exports.createBot = void 0;
const mod_js_1 = require("./rest/mod.js");
const bigint_js_1 = require("./util/bigint.js");
const mod_js_2 = require("./transformers/mod.js");
const constants_js_1 = require("./util/constants.js");
const gatewayManager_js_1 = require("./gateway/manager/gatewayManager.js");
const validateLength_js_1 = require("./util/validateLength.js");
const utils_js_1 = require("./util/utils.js");
const hash_js_1 = require("./util/hash.js");
const calculateShardId_js_1 = require("./util/calculateShardId.js");
const handlers = __importStar(require("./handlers/mod.js"));
const interaction_js_1 = require("./transformers/interaction.js");
const integration_js_1 = require("./transformers/integration.js");
const application_js_1 = require("./transformers/application.js");
const team_js_1 = require("./transformers/team.js");
const invite_js_1 = require("./transformers/invite.js");
const helpers = __importStar(require("./helpers/mod.js"));
const emoji_js_1 = require("./transformers/emoji.js");
const activity_js_1 = require("./transformers/activity.js");
const presence_js_1 = require("./transformers/presence.js");
const urlToBase64_js_1 = require("./util/urlToBase64.js");
const attachment_js_1 = require("./transformers/attachment.js");
const embed_js_1 = require("./transformers/embed.js");
const component_js_1 = require("./transformers/component.js");
const webhook_js_1 = require("./transformers/webhook.js");
const auditLogEntry_js_1 = require("./transformers/auditLogEntry.js");
const applicationCommandPermission_js_1 = require("./transformers/applicationCommandPermission.js");
const permissions_js_1 = require("./util/permissions.js");
const scheduledEvent_js_1 = require("./transformers/scheduledEvent.js");
const threadMember_js_1 = require("./transformers/threadMember.js");
const applicationCommandOption_js_1 = require("./transformers/applicationCommandOption.js");
const applicationCommand_js_1 = require("./transformers/applicationCommand.js");
const welcomeScreen_js_1 = require("./transformers/welcomeScreen.js");
const voiceRegion_js_1 = require("./transformers/voiceRegion.js");
const widget_js_1 = require("./transformers/widget.js");
const widgetSettings_js_1 = require("./transformers/widgetSettings.js");
const stageInstance_js_1 = require("./transformers/stageInstance.js");
const sticker_js_1 = require("./transformers/sticker.js");
const gatewayBot_js_1 = require("./transformers/gatewayBot.js");
const shared_js_1 = require("./types/shared.js");
const applicationCommandOptionChoice_js_1 = require("./transformers/applicationCommandOptionChoice.js");
const embed_js_2 = require("./transformers/reverse/embed.js");
const component_js_2 = require("./transformers/reverse/component.js");
const activity_js_2 = require("./transformers/reverse/activity.js");
const team_js_2 = require("./transformers/reverse/team.js");
const member_js_1 = require("./transformers/reverse/member.js");
const application_js_2 = require("./transformers/reverse/application.js");
const token_js_1 = require("./util/token.js");
const automodRule_js_1 = require("./transformers/automodRule.js");
const automodActionExecution_js_1 = require("./transformers/automodActionExecution.js");
const routes_js_1 = require("./util/routes.js");
const allowedMentions_js_1 = require("./transformers/reverse/allowedMentions.js");
function createBot(options) {
    const bot = {
        id: options.botId ?? (0, token_js_1.getBotIdFromToken)(options.token),
        applicationId: options.applicationId || options.botId,
        token: (0, token_js_1.removeTokenPrefix)(options.token),
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
        rest: (0, mod_js_1.createRestManager)({
            token: options.token,
            debug: options.events?.debug,
            secretKey: options.secretKey ?? undefined,
        }),
    };
    bot.helpers = createHelpers(bot, options.helpers ?? {});
    bot.gateway = (0, gatewayManager_js_1.createGatewayManager)({
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
exports.createBot = createBot;
function createEventHandlers(events) {
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
exports.createEventHandlers = createEventHandlers;
async function startBot(bot) {
    if (!Object.keys(bot.botGatewayData ?? {}).length) {
        bot.gateway.gatewayBot = await bot.helpers.getGatewayBot();
        bot.gateway.lastShardId = bot.gateway.gatewayBot.shards - 1;
        bot.gateway.manager.totalShards = bot.gateway.gatewayBot.shards;
    }
    bot.gateway.spawnShards();
}
exports.startBot = startBot;
function createUtils(options) {
    return {
        snowflakeToBigint: bigint_js_1.snowflakeToBigint,
        bigintToSnowflake: bigint_js_1.bigintToSnowflake,
        calculateShardId: calculateShardId_js_1.calculateShardId,
        delay: utils_js_1.delay,
        iconHashToBigInt: hash_js_1.iconHashToBigInt,
        iconBigintToHash: hash_js_1.iconBigintToHash,
        validateLength: validateLength_js_1.validateLength,
        urlToBase64: urlToBase64_js_1.urlToBase64,
        formatImageURL: utils_js_1.formatImageURL,
        calculateBits: permissions_js_1.calculateBits,
        calculatePermissions: permissions_js_1.calculatePermissions,
    };
}
exports.createUtils = createUtils;
async function stopBot(bot) {
    await bot.gateway.stop(1000, "User requested bot stop");
    return bot;
}
exports.stopBot = stopBot;
exports.defaultHelpers = { ...helpers };
function createHelpers(bot, customHelpers) {
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
exports.createHelpers = createHelpers;
function createBaseHelpers(options) {
    return {
        ...exports.defaultHelpers,
        ...options,
    };
}
exports.createBaseHelpers = createBaseHelpers;
function createTransformers(options) {
    return {
        reverse: {
            allowedMentions: options.reverse?.allowedMentions || allowedMentions_js_1.transformAllowedMentionsToDiscordAllowedMentions,
            embed: options.reverse?.embed || embed_js_2.transformEmbedToDiscordEmbed,
            component: options.reverse?.component || component_js_2.transformComponentToDiscordComponent,
            activity: options.reverse?.activity || activity_js_2.transformActivityToDiscordActivity,
            member: options.reverse?.member || member_js_1.transformMemberToDiscordMember,
            user: options.reverse?.user || member_js_1.transformUserToDiscordUser,
            team: options.reverse?.team || team_js_2.transformTeamToDiscordTeam,
            application: options.reverse?.application || application_js_2.transformApplicationToDiscordApplication,
        },
        automodRule: options.automodRule || automodRule_js_1.transformAutoModerationRule,
        automodActionExecution: options.automodActionExecution || automodActionExecution_js_1.transformAutoModerationActionExecution,
        activity: options.activity || activity_js_1.transformActivity,
        application: options.application || application_js_1.transformApplication,
        attachment: options.attachment || attachment_js_1.transformAttachment,
        channel: options.channel || mod_js_2.transformChannel,
        component: options.component || component_js_1.transformComponent,
        embed: options.embed || embed_js_1.transformEmbed,
        emoji: options.emoji || emoji_js_1.transformEmoji,
        guild: options.guild || mod_js_2.transformGuild,
        integration: options.integration || integration_js_1.transformIntegration,
        interaction: options.interaction || interaction_js_1.transformInteraction,
        interactionDataOptions: options.interactionDataOptions || interaction_js_1.transformInteractionDataOption,
        invite: options.invite || invite_js_1.transformInvite,
        member: options.member || mod_js_2.transformMember,
        message: options.message || mod_js_2.transformMessage,
        presence: options.presence || presence_js_1.transformPresence,
        role: options.role || mod_js_2.transformRole,
        user: options.user || mod_js_2.transformUser,
        team: options.team || team_js_1.transformTeam,
        voiceState: options.voiceState || mod_js_2.transformVoiceState,
        snowflake: options.snowflake || bigint_js_1.snowflakeToBigint,
        webhook: options.webhook || webhook_js_1.transformWebhook,
        auditLogEntry: options.auditLogEntry || auditLogEntry_js_1.transformAuditLogEntry,
        applicationCommand: options.applicationCommand ||
            applicationCommand_js_1.transformApplicationCommand,
        applicationCommandOption: options.applicationCommandOption ||
            applicationCommandOption_js_1.transformApplicationCommandOption,
        applicationCommandPermission: options.applicationCommandPermission ||
            applicationCommandPermission_js_1.transformApplicationCommandPermission,
        scheduledEvent: options.scheduledEvent || scheduledEvent_js_1.transformScheduledEvent,
        threadMember: options.threadMember || threadMember_js_1.transformThreadMember,
        welcomeScreen: options.welcomeScreen || welcomeScreen_js_1.transformWelcomeScreen,
        voiceRegion: options.voiceRegion || voiceRegion_js_1.transformVoiceRegion,
        widget: options.widget || widget_js_1.transformWidget,
        widgetSettings: options.widgetSettings || widgetSettings_js_1.transformWidgetSettings,
        stageInstance: options.stageInstance || stageInstance_js_1.transformStageInstance,
        sticker: options.sticker || sticker_js_1.transformSticker,
        stickerPack: options.stickerPack || sticker_js_1.transformStickerPack,
        gatewayBot: options.gatewayBot || gatewayBot_js_1.transformGatewayBot,
        applicationCommandOptionChoice: options.applicationCommandOptionChoice || applicationCommandOptionChoice_js_1.transformApplicationCommandOptionChoice,
        template: options.template || mod_js_2.transformTemplate,
    };
}
exports.createTransformers = createTransformers;
function createBotConstants() {
    return {
        DISCORDENO_VERSION: constants_js_1.DISCORDENO_VERSION,
        USER_AGENT: constants_js_1.USER_AGENT,
        BASE_URL: constants_js_1.baseEndpoints.BASE_URL,
        CDN_URL: constants_js_1.baseEndpoints.CDN_URL,
        routes: routes_js_1.routes,
        regexes: {
            SLASH_COMMANDS_NAME_REGEX: constants_js_1.SLASH_COMMANDS_NAME_REGEX,
            CONTEXT_MENU_COMMANDS_NAME_REGEX: constants_js_1.CONTEXT_MENU_COMMANDS_NAME_REGEX,
            CHANNEL_MENTION_REGEX: constants_js_1.CHANNEL_MENTION_REGEX,
            DISCORD_SNOWFLAKE_REGEX: constants_js_1.DISCORD_SNOWFLAKE_REGEX,
        },
        Errors: shared_js_1.Errors,
    };
}
exports.createBotConstants = createBotConstants;
function createBotGatewayHandlers(options) {
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
exports.createBotGatewayHandlers = createBotGatewayHandlers;
