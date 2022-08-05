import type { Bot } from "../../bot.js";
/**
 * Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
 *
 * Webhook names cannot be: 'clyde'
 */
export declare function createWebhook(bot: Bot, channelId: bigint, options: CreateWebhook): Promise<import("../../mod.js").Webhook>;
export interface CreateWebhook {
    /** Name of the webhook (1-80 characters) */
    name: string;
    /** Image url for the default webhook avatar */
    avatar?: string | null;
    /** The reason you are creating this webhook */
    reason?: string;
}
