"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuildTemplate = void 0;
/** Creates a template for the guild. Requires the `MANAGE_GUILD` permission. */
async function createGuildTemplate(bot, guildId, data) {
    if (data.name.length < 1 || data.name.length > 100) {
        throw new Error("The name can only be in between 1-100 characters.");
    }
    if (data.description?.length && data.description.length > 120) {
        throw new Error("The description can only be in between 0-120 characters.");
    }
    return await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.GUILD_TEMPLATES(guildId), data);
}
exports.createGuildTemplate = createGuildTemplate;
