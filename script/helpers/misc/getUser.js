"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
async function getUser(bot, userId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.USER(userId));
    if (!result.id)
        return;
    return bot.transformers.user(bot, result);
}
exports.getUser = getUser;
