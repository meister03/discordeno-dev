import type { Bot } from "../../bot.js";
/** Gets the stage instance associated with the Stage channel, if it exists. */
export declare function getStageInstance(bot: Bot, channelId: bigint): Promise<import("../../mod.js").StageInstance>;
