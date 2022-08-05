import type { Bot } from "../../bot.js";
export declare function editWelcomeScreen(bot: Bot, guildId: bigint, options: ModifyGuildWelcomeScreen): Promise<import("../../mod.js").WelcomeScreen>;
/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface ModifyGuildWelcomeScreen {
    /** Whether the welcome screen is enabled */
    enabled?: boolean | null;
    /** Channels linked in the welcome screen and their display options */
    welcomeScreen?: WelcomeScreenChannel[] | null;
    /** The server description to show in the welcome screen */
    description?: string | null;
}
export interface WelcomeScreenChannel {
    /** The channel's id */
    channelId: bigint;
    /** The emoji id, if the emoji is custom */
    emojiId?: bigint;
    /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
    emojiName?: string;
    /** The description shown for the channel */
    description: string;
}
