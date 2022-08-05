import type { Bot } from "../../bot.js";
/** Create an emoji in the server */
export declare function createEmoji(bot: Bot, guildId: bigint, options: CreateGuildEmoji): Promise<import("../../mod.js").Emoji>;
/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
    /** Name of the emoji */
    name: string;
    /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
    image: string;
    /** Roles allowed to use this emoji */
    roles?: bigint[];
    /** The reason you are creating this emoji */
    reason?: string;
}
