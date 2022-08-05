import type { Bot } from "../../../bot.js";
import { Collection } from "../../../util/collection.js";
import {
  CreateApplicationCommand,
  CreateContextApplicationCommand,
  isContextApplicationCommand,
  makeOptionsForCommand,
} from "./createApplicationCommand.js";
import { DiscordApplicationCommand } from "../../../types/discord.js";
import { MakeRequired } from "../../../types/shared.js";

/**
 * Bulk edit existing application commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any application commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertApplicationCommands(
  bot: Bot,
  options: (UpsertApplicationCommands | CreateContextApplicationCommand)[],
  guildId?: bigint,
) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "PUT",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.routes.COMMANDS(bot.applicationId),
    options.map((option) => (isContextApplicationCommand(option)
      ? {
        name: option.name,
        type: option.type,
      }
      : {
        name: option.name,
        description: option.description,
        type: option.type,
        options: option.options ? makeOptionsForCommand(option.options) : undefined,
      })
    ),
  );

  return new Collection(
    result.map((res) => {
      const command = bot.transformers.applicationCommand(bot, res);
      return [command.id, command];
    }),
  );
}

export interface UpsertApplicationCommands extends CreateApplicationCommand {
  /** ID of the command, if known */
  id?: bigint;
}
