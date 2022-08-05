import { isContextApplicationCommand, makeOptionsForCommand, } from "./createApplicationCommand.js";
/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export async function upsertApplicationCommand(bot, commandId, options, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", guildId
        ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
        : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId), isContextApplicationCommand(options)
        ? {
            name: options.name,
            type: options.type,
        }
        : {
            name: options.name,
            description: options.description,
            type: options.type,
            options: options.options ? makeOptionsForCommand(options.options) : undefined,
        });
    return bot.transformers.applicationCommand(bot, result);
}
