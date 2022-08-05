import { Bot } from "../../bot.js";

/** Kick a member from the server */
export async function kickMember(bot: Bot, guildId: bigint, memberId: bigint, reason?: string) {
  await bot.rest.runMethod<undefined>(bot.rest, "DELETE", bot.constants.routes.GUILD_MEMBER(guildId, memberId), {
    reason,
  });
}
