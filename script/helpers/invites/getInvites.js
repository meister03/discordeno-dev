"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvites = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
async function getInvites(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_INVITES(guildId));
    return new collection_js_1.Collection(result.map((invite) => [
        invite.code,
        {
            uses: invite.uses,
            maxUses: invite.max_uses,
            maxAge: invite.max_age,
            temporary: invite.temporary,
            createdAt: Date.parse(invite.created_at),
        },
    ]));
}
exports.getInvites = getInvites;
