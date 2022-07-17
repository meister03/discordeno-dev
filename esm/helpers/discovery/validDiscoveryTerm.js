export async function validDiscoveryTerm(bot, term) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.DISCOVERY_VALID_TERM(term));
    return result.valid;
}
