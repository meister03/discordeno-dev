"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildTemplates = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns an array of templates. Requires the `MANAGE_GUILD` permission. */
async function getGuildTemplates(bot, guildId) {
    const templates = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_TEMPLATES(guildId));
    return new collection_js_1.Collection(templates.map((template) => [template.code, bot.transformers.template(bot, template)]));
}
exports.getGuildTemplates = getGuildTemplates;
