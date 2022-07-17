"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyRolePositions = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events. */
async function modifyRolePositions(bot, guildId, options) {
    const roles = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_ROLES(guildId), options);
    return new collection_js_1.Collection(roles.map((role) => {
        const result = bot.transformers.role(bot, { role, guildId });
        return [result.id, result];
    }));
}
exports.modifyRolePositions = modifyRolePositions;
