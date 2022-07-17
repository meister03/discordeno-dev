import type { Bot } from "../../bot.js";
import { ModifyWebhook } from "./editWebhook.js";
/** Edit a webhook. Returns the updated webhook object on success. */
export declare function editWebhookWithToken(bot: Bot, webhookId: bigint, webhookToken: string, options: Omit<ModifyWebhook, "channelId">): Promise<import("../../mod.js").Webhook>;
