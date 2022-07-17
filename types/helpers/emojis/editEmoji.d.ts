import type { Bot } from "../../bot.js";
/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export declare function editEmoji(bot: Bot, guildId: bigint, id: bigint, options: ModifyGuildEmoji): Promise<import("../../mod.js").Emoji>;
/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji {
    /** Name of the emoji */
    name?: string;
    /** Roles allowed to use this emoji */
    roles?: bigint[] | null;
}
