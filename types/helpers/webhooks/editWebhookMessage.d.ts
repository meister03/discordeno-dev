import type { Bot } from "../../bot.js";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.js";
import { Attachment } from "../../transformers/attachment.js";
import { Embed } from "../../transformers/embed.js";
export declare function editWebhookMessage(bot: Bot, webhookId: bigint, webhookToken: string, options: EditWebhookMessage & {
    messageId?: bigint;
    threadId?: bigint;
}): Promise<import("../../mod.js").Message>;
/** https://discord.com/developers/docs/resources/webhook#edit-webhook-message-jsonform-params */
export interface EditWebhookMessage {
    /** The message contents (up to 2000 characters) */
    content?: string;
    /** Embedded `rich` content */
    embeds?: Embed[];
    /** The contents of the file being sent/edited */
    file?: FileContent | FileContent[];
    /** Allowed mentions for the message */
    allowedMentions?: AllowedMentions;
    /** Attached files to keep */
    attachments?: Attachment[];
    /** The components you would like to have sent in this message */
    components?: MessageComponents;
}
