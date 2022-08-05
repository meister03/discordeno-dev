import { Bot } from "../../../bot.js";
/** Returns a followup message for an Interaction. Functions the same as get webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export declare function getFollowupMessage(bot: Bot, interactionToken: string, messageId: bigint): Promise<import("../../../mod.js").Message>;
