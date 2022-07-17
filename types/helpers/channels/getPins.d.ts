import type { Bot } from "../../bot.js";
/** Get pinned messages in this channel. */
export declare function getPins(bot: Bot, channelId: bigint): Promise<import("../../mod.js").Message[]>;
