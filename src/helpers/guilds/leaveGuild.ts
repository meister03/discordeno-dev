import type { Bot } from "../../bot.js";

/** Leave a guild */
export async function leaveGuild(bot: Bot, guildId: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "DELETE", bot.constants.routes.GUILD_LEAVE(guildId));
}
