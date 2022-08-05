import type { Bot } from "../../bot.js";
/** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
export declare function editDiscovery(bot: Bot, guildId: bigint, data: ModifyGuildDiscoveryMetadata): Promise<{
    guildId: bigint;
    primaryCategoryId: number;
    keywords: string[] | undefined;
    emojiDiscoverabilityEnabled: boolean;
    partnerActionedTimestamp: number | undefined;
    partnerApplicationTimestamp: number | undefined;
    categoryIds: number[];
}>;
export interface ModifyGuildDiscoveryMetadata {
    /** The id of the primary discovery category. Default: 0 */
    primaryCategoryId?: number | null;
    /** Up to 10 discovery search keywords. Default: null */
    keywords?: string[] | null;
    /** Whether guild info is shown when custom emojis are clicked. Default: true */
    emojiDiscoverabilityEnabled?: boolean | null;
}
