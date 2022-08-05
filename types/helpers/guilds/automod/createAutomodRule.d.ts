import { Bot } from "../../../bot.js";
import { AutoModerationActionType, AutoModerationEventTypes, AutoModerationTriggerTypes, DiscordAutoModerationRuleTriggerMetadataPresets } from "../../../types/discord.js";
/** Get a rule currently configured for guild. */
export declare function createAutomodRule(bot: Bot, guildId: bigint, options: CreateAutoModerationRuleOptions): Promise<import("../../../transformers/automodRule.js").AutoModerationRule>;
export interface CreateAutoModerationRuleOptions {
    /** The name of the rule. */
    name: string;
    /** The type of event to trigger the rule on. */
    eventType: AutoModerationEventTypes;
    /** The type of trigger to use for the rule. */
    triggerType: AutoModerationTriggerTypes;
    /** The metadata to use for the trigger. */
    triggerMetadata: {
        /** The keywords needed to match. Only present when TriggerType.Keyword */
        keywordFilter?: string[];
        /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
        presets?: DiscordAutoModerationRuleTriggerMetadataPresets[];
    };
    /** The actions that will trigger for this rule */
    actions: {
        /** The type of action to take when a rule is triggered */
        type: AutoModerationActionType;
        /** additional metadata needed during execution for this specific action type */
        metadata?: {
            /** The id of channel to which user content should be logged. Only in SendAlertMessage */
            channelId?: bigint;
            /** Timeout duration in seconds. Max is 2419200(4 weeks). Only supported for TriggerType.Keyword */
            durationSeconds?: number;
        };
    }[];
    /** Whether the rule should be enabled, true by default. */
    enabled?: boolean;
    /** The role ids that should not be effected by the rule */
    exemptRoles?: bigint[];
    /** The channel ids that should not be effected by the rule. */
    exemptChannels?: bigint[];
}
