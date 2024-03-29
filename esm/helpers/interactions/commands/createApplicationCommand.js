import { ApplicationCommandTypes } from "../../../mod.js";
/**
 * There are two kinds of Application Commands: global commands and guild commands. Global commands are available for every guild that adds your app; guild commands are specific to the guild you specify when making them. Command names are unique per application within each scope (global and guild). That means:
 *
 * - Your app **cannot** have two global commands with the same name
 * - Your app **cannot** have two guild commands within the same name **on the same guild**
 * - Your app **can** have a global and guild command with the same name
 * - Multiple apps **can** have commands with the same names
 *
 * Global commands are cached for **1 hour**. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour.
 * Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.
 */
export async function createApplicationCommand(bot, options, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "POST", guildId
        ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
        : bot.constants.routes.COMMANDS(bot.applicationId), isContextApplicationCommand(options)
        ? { name: options.name, name_localizations: options.nameLocalizations, type: options.type }
        : {
            name: options.name,
            name_localizations: options.nameLocalizations,
            description: options.description,
            description_localizations: options.descriptionLocalizations,
            type: options.type,
            options: options.options ? makeOptionsForCommand(options.options) : undefined,
            default_member_permissions: options.defaultMemberPermissions
                ? bot.utils.calculateBits(options.defaultMemberPermissions)
                : undefined,
            dm_permission: options.dmPermission,
        });
    return bot.transformers.applicationCommand(bot, result);
}
export function makeOptionsForCommand(options) {
    return options.map((option) => ({
        type: option.type,
        name: option.name,
        name_localizations: option.nameLocalizations,
        description: option.description,
        description_localizations: option.descriptionLocalizations,
        required: option.required,
        choices: option.choices?.map((choice) => ({
            name: choice.name,
            name_localizations: choice.nameLocalizations,
            value: choice.value,
        })),
        options: option.options ? makeOptionsForCommand(option.options) : undefined,
        channel_types: option.channelTypes,
        autocomplete: option.autocomplete,
        min_value: option.minValue,
        max_value: option.maxValue,
        min_length: option.minLength,
        max_length: option.maxLength,
    }));
}
export function isContextApplicationCommand(cmd) {
    return cmd.type === ApplicationCommandTypes.Message || cmd.type === ApplicationCommandTypes.User;
}
