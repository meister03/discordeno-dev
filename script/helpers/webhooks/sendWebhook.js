"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWebhook = void 0;
/** Send a webhook with webhook Id and webhook token */
async function sendWebhook(bot, webhookId, webhookToken, options) {
    const allowedMentions = options.allowedMentions
        ? {
            parse: options.allowedMentions.parse,
            replied_user: options.allowedMentions.repliedUser,
            users: options.allowedMentions.users?.map((id) => id.toString()),
            roles: options.allowedMentions.roles?.map((id) => id.toString()),
        }
        : { parse: [] };
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.WEBHOOK(webhookId, webhookToken, options), {
        wait: options.wait,
        thread_id: options.threadId,
        content: options.content,
        username: options.username,
        avatar_url: options.avatarUrl,
        tts: options.tts,
        file: options.file,
        embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
        allowed_mentions: allowedMentions,
        components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
    });
    if (!options.wait)
        return;
    return bot.transformers.message(bot, result);
}
exports.sendWebhook = sendWebhook;
