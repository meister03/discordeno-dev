import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
import { DiscordInviteMetadata } from "../../types/discord.js";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordInviteMetadata[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INVITES(guildId),
  );

  return new Collection(
    result.map((invite) => [
      invite.code,
      {
        uses: invite.uses,
        maxUses: invite.max_uses,
        maxAge: invite.max_age,
        temporary: invite.temporary,
        createdAt: Date.parse(invite.created_at),
      },
    ]),
  );
}
