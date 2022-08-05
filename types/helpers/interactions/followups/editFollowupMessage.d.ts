import { Bot } from "../../../bot.js";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.js";
/** Edits a followup message for an Interaction. Functions the same as edit webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export declare function editFollowupMessage(bot: Bot, interactionToken: string, messageId: bigint, options: EditWebhookMessage): Promise<import("../../../mod.js").Message>;
