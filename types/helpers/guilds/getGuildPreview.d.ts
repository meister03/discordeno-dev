import type { Bot } from "../../bot.js";
/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export declare function getGuildPreview(bot: Bot, guildId: bigint): Promise<{
    id: bigint;
    name: string;
    icon: string | undefined;
    splash: string | undefined;
    discoverySplash: string | undefined;
    emojis: import("../../mod.js").Emoji[];
    features: import("../../mod.js").GuildFeatures[];
    approximateMemberCount: number;
    approximatePresenceCount: number;
    description: string | undefined;
    stickers: import("../../mod.js").Sticker[];
}>;
