import { Bot } from "../../../bot.js";
/** Get a rule currently configured for guild. */
export declare function getAutomodRule(bot: Bot, guildId: bigint, ruleId: bigint): Promise<import("../../../transformers/automodRule.js").AutoModerationRule>;
