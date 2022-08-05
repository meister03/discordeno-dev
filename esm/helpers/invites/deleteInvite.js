/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(bot, inviteCode) {
    await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.INVITE(inviteCode));
}
