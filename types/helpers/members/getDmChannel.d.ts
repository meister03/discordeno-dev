import type { Bot } from "../../bot.js";
/** Get a user's dm channel. This is required in order to send a DM. */
export declare function getDmChannel(bot: Bot, userId: bigint): Promise<import("../../mod.js").Channel | undefined>;
