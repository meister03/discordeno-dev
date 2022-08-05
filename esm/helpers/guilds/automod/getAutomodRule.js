/** Get a rule currently configured for guild. */
export async function getAutomodRule(bot, guildId, ruleId) {
    const rule = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.AUTOMOD_RULE(guildId, ruleId));
    return bot.transformers.automodRule(bot, rule);
}
