import type { Bot } from "../../bot.js";
import { Embed } from "../../mod.js";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.js";
import { InteractionResponseTypes } from "../../types/shared.js";
/**
 * Send a response to a users application command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export declare function sendInteractionResponse(bot: Bot, id: bigint, token: string, options: InteractionResponse): Promise<import("../../mod.js").Message | undefined>;
/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
    /** The type of response */
    type: InteractionResponseTypes;
    /** An optional response message */
    data?: InteractionApplicationCommandCallbackData;
}
/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData {
    /** The message contents (up to 2000 characters) */
    content?: string;
    /** True if this is a TTS message */
    tts?: boolean;
    /** Embedded `rich` content (up to 6000 characters) */
    embeds?: Embed[];
    /** Allowed mentions for the message */
    allowedMentions?: AllowedMentions;
    /** The contents of the file being sent */
    file?: FileContent | FileContent[];
    /** The customId you want to use for this modal response. */
    customId?: string;
    /** The title you want to use for this modal response. */
    title?: string;
    /** The components you would like to have sent in this message */
    components?: MessageComponents;
    /** Message flags combined as a bit field (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
    flags?: number;
    /** Autocomplete choices (max of 25 choices) */
    choices?: ApplicationCommandOptionChoice[];
}
/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
    /** 1-100 character choice name */
    name: string;
    /** Value of the choice, up to 100 characters if string */
    value: string | number;
}
