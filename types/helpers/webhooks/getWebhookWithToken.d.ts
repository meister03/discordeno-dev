import type { Bot } from "../../bot.js";
/** Returns the new webhook object for the given id, this call does not require authentication and returns no user in the webhook object. */
export declare function getWebhookWithToken(bot: Bot, webhookId: bigint, token: string): Promise<import("../../mod.js").Webhook>;
