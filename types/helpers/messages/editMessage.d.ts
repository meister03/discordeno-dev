import type { Bot } from "../../bot.js";
import { Attachment } from "../../transformers/attachment.js";
import { Embed } from "../../transformers/embed.js";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.js";
/** Edit the message. */
export declare function editMessage(bot: Bot, channelId: bigint, messageId: bigint, content: EditMessage): Promise<import("../../mod.js").Message>;
/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
    /** The new message contents (up to 2000 characters) */
    content?: string | null;
    /** Embedded `rich` content (up to 6000 characters) */
    embeds?: Embed[] | null;
    /** Edit the flags of the message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
    flags?: 4 | null;
    /** The contents of the file being sent/edited */
    file?: FileContent | FileContent[] | null;
    /** Allowed mentions for the message */
    allowedMentions?: AllowedMentions;
    /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
    attachments?: Attachment[];
    /** The components you would like to have sent in this message */
    components?: MessageComponents;
}
