import type { Bot } from "../../bot.js";
/** The users custom avatar or the default avatar if you don't have a member object. */
export declare function avatarURL(bot: Bot, userId: bigint, discriminator: string, options?: {
    avatar: bigint | undefined;
    size?: ImageSize;
    format?: ImageFormat;
}): string;
/**
 * https://discord.com/developers/docs/reference#image-formatting
 * json is only for stickers
 */
export declare type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "json";
/** https://discord.com/developers/docs/reference#image-formatting */
export declare type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
