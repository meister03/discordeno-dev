import { Collection } from "../../util/collection.js";
import { hasProperty } from "../../util/utils.js";
/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(bot, channelId, options) {
    if (options?.limit && (options.limit < 0 || options.limit > 100)) {
        throw new Error(bot.constants.Errors.INVALID_GET_MESSAGES_LIMIT);
    }
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_MESSAGES(channelId, options));
    return new Collection(result.map((res) => {
        const msg = bot.transformers.message(bot, res);
        return [msg.id, msg];
    }));
}
export function isGetMessagesAfter(options) {
    return hasProperty(options, "after");
}
export function isGetMessagesBefore(options) {
    return hasProperty(options, "before");
}
export function isGetMessagesAround(options) {
    return hasProperty(options, "around");
}
export function isGetMessagesLimit(options) {
    return hasProperty(options, "limit");
}
