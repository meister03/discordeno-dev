"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncGuildTemplate = void 0;
/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
async function syncGuildTemplate(bot, guildId, templateCode) {
    return await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode));
}
exports.syncGuildTemplate = syncGuildTemplate;
