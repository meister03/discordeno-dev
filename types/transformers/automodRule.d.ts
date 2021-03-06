import { Bot } from "../bot.js";
import { DiscordAutoModerationRule } from "../types/discord.js";
export declare function transformAutoModerationRule(bot: Bot, payload: DiscordAutoModerationRule): {
    triggerMetadata?: {
        keywordFilter?: string[] | undefined;
        presets?: import("../types/discord.js").DiscordAutoModerationRuleTriggerMetadataPresets[] | undefined;
    } | undefined;
    id: bigint;
    name: string;
    guildId: bigint;
    enabled: boolean;
    creatorId: bigint;
    eventType: import("../types/discord.js").AutoModerationEventTypes;
    triggerType: import("../types/discord.js").AutoModerationTriggerTypes;
    exemptRoles: bigint[];
    exemptChannels: bigint[];
    actions: {
        type: import("../types/discord.js").AutoModerationActionType;
        metadata: {
            channelId: bigint | undefined;
            durationSeconds: number | undefined;
        } | undefined;
    }[];
};
export interface AutoModerationRule extends ReturnType<typeof transformAutoModerationRule> {
}
