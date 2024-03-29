import type { Bot } from "../../bot.js";
import { DiscordInviteMetadata } from "../../types/discord.js";

/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(bot: Bot, inviteCode: string) {
  await bot.rest.runMethod<DiscordInviteMetadata>(bot.rest, "DELETE", bot.constants.routes.INVITE(inviteCode));
}
