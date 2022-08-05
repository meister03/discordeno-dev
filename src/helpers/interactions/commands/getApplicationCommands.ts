import { Collection } from "../../../util/collection.js";
import type { Bot } from "../../../bot.js";
import { DiscordApplicationCommand } from "../../../types/discord.js";

/** Fetch all the commands for your application. If a guild id is not provided, it will fetch global commands. */
export async function getApplicationCommands(bot: Bot, guildId?: bigint) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "GET",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.routes.COMMANDS(bot.applicationId),
  );

  return new Collection(
    result.map((res) => {
      const command = bot.transformers.applicationCommand(bot, res);
      return [command.id, command];
    }),
  );
}
