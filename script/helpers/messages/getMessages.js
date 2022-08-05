"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGetMessagesLimit = exports.isGetMessagesAround = exports.isGetMessagesBefore = exports.isGetMessagesAfter = exports.getMessages = void 0;
const collection_js_1 = require("../../util/collection.js");
const utils_js_1 = require("../../util/utils.js");
/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
async function getMessages(bot, channelId, options) {
    if (options?.limit && (options.limit < 0 || options.limit > 100)) {
        throw new Error(bot.constants.Errors.INVALID_GET_MESSAGES_LIMIT);
    }
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_MESSAGES(channelId, options));
    return new collection_js_1.Collection(result.map((res) => {
        const msg = bot.transformers.message(bot, res);
        return [msg.id, msg];
    }));
}
exports.getMessages = getMessages;
function isGetMessagesAfter(options) {
    return (0, utils_js_1.hasProperty)(options, "after");
}
exports.isGetMessagesAfter = isGetMessagesAfter;
function isGetMessagesBefore(options) {
    return (0, utils_js_1.hasProperty)(options, "before");
}
exports.isGetMessagesBefore = isGetMessagesBefore;
function isGetMessagesAround(options) {
    return (0, utils_js_1.hasProperty)(options, "around");
}
exports.isGetMessagesAround = isGetMessagesAround;
function isGetMessagesLimit(options) {
    return (0, utils_js_1.hasProperty)(options, "limit");
}
exports.isGetMessagesLimit = isGetMessagesLimit;
