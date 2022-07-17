import type { Bot } from "../../bot.js";
/** Crosspost a message in a News Channel to following channels. */
export declare function publishMessage(bot: Bot, channelId: bigint, messageId: bigint): Promise<import("../../mod.js").Message>;
