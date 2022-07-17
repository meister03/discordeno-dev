"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = void 0;
/** Returns the guild template if it exists */
async function getTemplate(bot, templateCode) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.TEMPLATE(templateCode));
    return bot.transformers.template(bot, result);
}
exports.getTemplate = getTemplate;
