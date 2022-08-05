import type { Bot } from "../../bot.js";
export interface GetWebhookMessageOptions {
    threadId: bigint;
}
/** Returns a previously-sent webhook message from the same token. Returns a message object on success. */
export declare function getWebhookMessage(bot: Bot, webhookId: bigint, webhookToken: string, messageId: bigint, options?: GetWebhookMessageOptions): Promise<import("../../mod.js").Message>;
