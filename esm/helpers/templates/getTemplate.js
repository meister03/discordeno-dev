/** Returns the guild template if it exists */
export async function getTemplate(bot, templateCode) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.TEMPLATE(templateCode));
    return bot.transformers.template(bot, result);
}
