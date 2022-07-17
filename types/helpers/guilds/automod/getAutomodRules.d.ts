import { Bot } from "../../../bot.js";
import { Collection } from "../../../util/collection.js";
/** Get a list of all rules currently configured for guild. */
export declare function getAutomodRules(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../../transformers/automodRule.js").AutoModerationRule>>;
