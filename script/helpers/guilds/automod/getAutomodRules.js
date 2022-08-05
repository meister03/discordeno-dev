"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutomodRules = void 0;
const collection_js_1 = require("../../../util/collection.js");
/** Get a list of all rules currently configured for guild. */
async function getAutomodRules(bot, guildId) {
    const rules = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.AUTOMOD_RULES(guildId));
    return new collection_js_1.Collection(rules.map((r) => {
        const rule = bot.transformers.automodRule(bot, r);
        return [rule.id, rule];
    }));
}
exports.getAutomodRules = getAutomodRules;
