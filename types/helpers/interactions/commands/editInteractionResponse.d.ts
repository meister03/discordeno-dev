import type { Bot } from "../../../bot.js";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.js";
/** To edit your response to a application command. If a messageId is not provided it will default to editing the original response. */
export declare function editInteractionResponse(bot: Bot, token: string, options: EditWebhookMessage & {
    /** Id of the message you want to edit if undefined the initial response message will be edited */
    messageId?: bigint;
}): Promise<import("../../../mod.js").Message | undefined>;
