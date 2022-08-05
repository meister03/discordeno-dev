"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editGuildTemplate = void 0;
/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
async function editGuildTemplate(bot, guildId, templateCode, data) {
    if (data.name?.length && (data.name.length < 1 || data.name.length > 100)) {
        throw new Error("The name can only be in between 1-100 characters.");
    }
    if (data.description?.length && data.description.length > 120) {
        throw new Error("The description can only be in between 0-120 characters.");
    }
    return await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode), {
        name: data.name,
        description: data.description,
    });
}
exports.editGuildTemplate = editGuildTemplate;
