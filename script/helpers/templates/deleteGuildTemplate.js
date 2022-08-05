"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuildTemplate = void 0;
/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
async function deleteGuildTemplate(bot, guildId, templateCode) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode));
}
exports.deleteGuildTemplate = deleteGuildTemplate;
