import type { Bot } from "../../bot.js";
import { ImageFormat, ImageSize } from "../members/avatarUrl.js";
/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
export declare function guildIconURL(bot: Bot, id: bigint, icon: bigint | undefined, options?: {
    size?: ImageSize;
    format?: ImageFormat;
}): string | undefined;
