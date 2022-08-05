import { Bot } from "../../../bot.js";
import { AutoModerationActionType, AutoModerationEventTypes, DiscordAutoModerationRuleTriggerMetadataPresets } from "../../../types/discord.js";
/** Edit a rule currently configured for guild. */
export declare function editAutomodRule(bot: Bot, guildId: bigint, options: Partial<EditAutoModerationRuleOptions>): Promise<import("../../../transformers/automodRule.js").AutoModerationRule>;
export interface EditAutoModerationRuleOptions {
    /** The name of the rule. */
    name: string;
    /** The type of event to trigger the rule on. */
    eventType: AutoModerationEventTypes;
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
        metadata: {
            /** The id of channel to which user content should be logged. Only in SendAlertMessage */
            channelId?: bigint;
            /** Timeout duration in seconds. Only supported for TriggerType.Keyword */
            durationSeconds?: number;
        };
    }[];
    /** Whether the rule should be enabled. */
    enabled?: boolean;
    /** The role ids that should not be effected by the rule */
    exemptRoles?: bigint[];
    /** The channel ids that should not be effected by the rule. */
    exemptChannels?: bigint[];
}
