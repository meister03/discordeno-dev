import type { Bot } from "../../../bot.js";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.js";
import { Collection } from "../../../util/collection.js";

/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
export async function getApplicationCommandPermissions(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions[]>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_PERMISSIONS(bot.applicationId, guildId),
  );

  return new Collection(
    result.map((res) => {
      const perms = bot.transformers.applicationCommandPermission(bot, res);
      return [perms.id, perms];
    }),
  );
}
