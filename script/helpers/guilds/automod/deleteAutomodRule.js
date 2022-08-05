"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAutomodRule = void 0;
/** Delete a rule currently configured for guild. */
async function deleteAutomodRule(bot, guildId, ruleId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.AUTOMOD_RULE(guildId, ruleId));
}
exports.deleteAutomodRule = deleteAutomodRule;
