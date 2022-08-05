import type { Bot } from "../../bot.js";
import { ImageFormat, ImageSize } from "../members/avatarUrl.js";
/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export declare function guildBannerURL(bot: Bot, id: bigint, options: {
    banner?: string | bigint;
    size?: ImageSize;
    format?: ImageFormat;
}): string | undefined;
