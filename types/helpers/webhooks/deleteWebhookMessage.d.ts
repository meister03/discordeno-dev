import type { Bot } from "../../bot.js";
export interface DeleteWebhookMessageOptions {
    /** id of the thread the message is in */
    threadId: bigint;
}
export declare function deleteWebhookMessage(bot: Bot, webhookId: bigint, webhookToken: string, messageId: bigint, options?: DeleteWebhookMessageOptions): Promise<void>;
