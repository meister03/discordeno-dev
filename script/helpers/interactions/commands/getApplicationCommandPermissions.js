"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationCommandPermissions = void 0;
const collection_js_1 = require("../../../util/collection.js");
/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
async function getApplicationCommandPermissions(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.COMMANDS_PERMISSIONS(bot.applicationId, guildId));
    return new collection_js_1.Collection(result.map((res) => {
        const perms = bot.transformers.applicationCommandPermission(bot, res);
        return [perms.id, perms];
    }));
}
exports.getApplicationCommandPermissions = getApplicationCommandPermissions;
