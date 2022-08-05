import type { Bot } from "../../bot.js";
/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
export declare function getDiscovery(bot: Bot, guildId: bigint): Promise<{
    guildId: bigint;
    primaryCategoryId: number;
    keywords: string[] | undefined;
    emojiDiscoverabilityEnabled: boolean;
    partnerActionedTimestamp: number | undefined;
    partnerApplicationTimestamp: number | undefined;
    categoryIds: number[];
}>;
