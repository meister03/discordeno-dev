import type { Bot } from "../../bot.js";
/** Returns the new webhook object for the given id. */
export declare function getWebhook(bot: Bot, webhookId: bigint): Promise<import("../../mod.js").Webhook | undefined>;
