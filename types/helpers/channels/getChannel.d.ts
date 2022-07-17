import type { Bot } from "../../bot.js";
/** Fetches a single channel object from the api. */
export declare function getChannel(bot: Bot, channelId: bigint): Promise<import("../../mod.js").Channel | undefined>;
