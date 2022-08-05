"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvite = void 0;
/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
async function deleteInvite(bot, inviteCode) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.INVITE(inviteCode));
}
exports.deleteInvite = deleteInvite;
