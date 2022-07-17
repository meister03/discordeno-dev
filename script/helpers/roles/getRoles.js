"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoles = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Returns a list of role objects for the guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
 */
async function getRoles(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_ROLES(guildId));
    const roleStructures = result.map((role) => bot.transformers.role(bot, { role, guildId }));
    return new collection_js_1.Collection(roleStructures.map((role) => [role.id, role]));
}
exports.getRoles = getRoles;
