"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editInteractionResponse = void 0;
const shared_js_1 = require("../../../types/shared.js");
/** To edit your response to a application command. If a messageId is not provided it will default to editing the original response. */
async function editInteractionResponse(bot, token, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", options.messageId
        ? bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, token, options.messageId)
        : bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token), {
        content: options.content,
        embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
        file: options.file,
        allowed_mentions: options.allowedMentions
            ? {
                parse: options.allowedMentions.parse,
                roles: options.allowedMentions.roles?.map((id) => id.toString()),
                users: options.allowedMentions.users?.map((id) => id.toString()),
                replied_user: options.allowedMentions.repliedUser,
            }
            : undefined,
        attachments: options.attachments?.map((attachment) => ({
            id: attachment.id.toString(),
            filename: attachment.filename,
            content_type: attachment.contentType,
            size: attachment.size,
            url: attachment.url,
            proxy_url: attachment.proxyUrl,
            height: attachment.height,
            width: attachment.width,
            ephemeral: attachment.ephemeral,
        })),
        components: options.components?.map((component) => ({
            type: component.type,
            components: component.components.map((subComponent) => {
                if (subComponent.type === shared_js_1.MessageComponentTypes.InputText) {
                    return {
                        type: subComponent.type,
                        style: subComponent.style,
                        custom_id: subComponent.customId,
                        label: subComponent.label,
                        placeholder: subComponent.placeholder,
                        min_length: subComponent.minLength ?? subComponent.required === false ? 0 : subComponent.minLength,
                        max_length: subComponent.maxLength,
                    };
                }
                if (subComponent.type === shared_js_1.MessageComponentTypes.SelectMenu) {
                    return {
                        type: subComponent.type,
                        custom_id: subComponent.customId,
                        placeholder: subComponent.placeholder,
                        min_values: subComponent.minValues,
                        max_values: subComponent.maxValues,
                        disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
                        options: subComponent.options.map((option) => ({
                            label: option.label,
                            value: option.value,
                            description: option.description,
                            emoji: option.emoji
                                ? {
                                    id: option.emoji.id?.toString(),
                                    name: option.emoji.name,
                                    animated: option.emoji.animated,
                                }
                                : undefined,
                            default: option.default,
                        })),
                    };
                }
                return {
                    type: subComponent.type,
                    custom_id: subComponent.customId,
                    label: subComponent.label,
                    style: subComponent.style,
                    emoji: "emoji" in subComponent && subComponent.emoji
                        ? {
                            id: subComponent.emoji.id?.toString(),
                            name: subComponent.emoji.name,
                            animated: subComponent.emoji.animated,
                        }
                        : undefined,
                    url: "url" in subComponent ? subComponent.url : undefined,
                    disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
                };
            }),
        })),
        message_id: options.messageId?.toString(),
    });
    // If the original message was edited, this will not return a message
    if (!options.messageId)
        return result;
    return bot.transformers.message(bot, result);
}
exports.editInteractionResponse = editInteractionResponse;
