import type { Bot } from "../../bot.js";
/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export declare function editWebhook(bot: Bot, webhookId: bigint, options: ModifyWebhook): Promise<import("../../mod.js").Webhook>;
export interface ModifyWebhook {
    /** The default name of the webhook */
    name?: string;
    /** Image for the default webhook avatar */
    avatar?: bigint | null;
    /** The new channel id this webhook should be moved to */
    channelId?: bigint;
    /** The reason you are modifying this webhook */
    reason?: string;
}
