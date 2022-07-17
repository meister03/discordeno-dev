import type { Bot } from "../../bot.js";
import { Embed } from "../../transformers/embed.js";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.js";
/** Send a webhook with webhook Id and webhook token */
export declare function sendWebhook(bot: Bot, webhookId: bigint, webhookToken: string, options: ExecuteWebhook): Promise<import("../../mod.js").Message | undefined>;
/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
    /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
    wait?: boolean;
    /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
    threadId?: bigint;
    /** The message contents (up to 2000 characters) */
    content?: string;
    /** Override the default username of the webhook */
    username?: string;
    /** Override the default avatar of the webhook */
    avatarUrl?: string;
    /** True if this is a TTS message */
    tts?: boolean;
    /** The contents of the file being sent */
    file?: FileContent | FileContent[];
    /** Embedded `rich` content */
    embeds?: Embed[];
    /** Allowed mentions for the message */
    allowedMentions?: AllowedMentions;
    /** the components to include with the message */
    components?: MessageComponents;
}
