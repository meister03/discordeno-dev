/** Delete a rule currently configured for guild. */
export async function deleteAutomodRule(bot, guildId, ruleId) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.AUTOMOD_RULE(guildId, ruleId));
}
