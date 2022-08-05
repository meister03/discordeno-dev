import type { Bot } from "../../../bot.js";
import {
  CreateApplicationCommand,
  CreateContextApplicationCommand,
  isContextApplicationCommand,
  makeOptionsForCommand,
} from "./createApplicationCommand.js";
import { DiscordApplicationCommand } from "../../../types/discord.js";
import { AtLeastOne } from "../../../types/shared.js";

/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export async function upsertApplicationCommand(
  bot: Bot,
  commandId: bigint,
  options: AtLeastOne<CreateApplicationCommand> | AtLeastOne<CreateContextApplicationCommand>,
  guildId?: bigint,
) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
    isContextApplicationCommand(options)
      ? {
        name: options.name,
        type: options.type,
      }
      : {
        name: options.name,
        description: options.description,
        type: options.type,
        options: options.options ? makeOptionsForCommand(options.options) : undefined,
      },
  );

  return bot.transformers.applicationCommand(bot, result);
}
