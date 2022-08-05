"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutomodRule = void 0;
/** Get a rule currently configured for guild. */
async function getAutomodRule(bot, guildId, ruleId) {
    const rule = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.AUTOMOD_RULE(guildId, ruleId));
    return bot.transformers.automodRule(bot, rule);
}
exports.getAutomodRule = getAutomodRule;
