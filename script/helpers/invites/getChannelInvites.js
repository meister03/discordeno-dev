"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelInvites = void 0;
const collection_js_1 = require("../../util/collection.js");
/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
async function getChannelInvites(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.CHANNEL_INVITES(channelId));
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
exports.getChannelInvites = getChannelInvites;
