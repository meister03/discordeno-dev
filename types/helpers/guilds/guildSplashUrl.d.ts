import type { Bot } from "../../bot.js";
import { ImageFormat, ImageSize } from "../members/avatarUrl.js";
/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export declare function guildSplashURL(bot: Bot, id: bigint, splash: bigint | undefined, options?: {
    size?: ImageSize;
    format?: ImageFormat;
}): string | undefined;
