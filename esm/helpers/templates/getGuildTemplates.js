import { Collection } from "../../util/collection.js";
/** Returns an array of templates. Requires the `MANAGE_GUILD` permission. */
export async function getGuildTemplates(bot, guildId) {
    const templates = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_TEMPLATES(guildId));
    return new Collection(templates.map((template) => [template.code, bot.transformers.template(bot, template)]));
}
