import { Collection } from "../../../util/collection.js";
/** Get a list of all rules currently configured for guild. */
export async function getAutomodRules(bot, guildId) {
    const rules = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.AUTOMOD_RULES(guildId));
    return new Collection(rules.map((r) => {
        const rule = bot.transformers.automodRule(bot, r);
        return [rule.id, rule];
    }));
}
