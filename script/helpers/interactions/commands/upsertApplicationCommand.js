"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertApplicationCommand = void 0;
const createApplicationCommand_js_1 = require("./createApplicationCommand.js");
/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
async function upsertApplicationCommand(bot, commandId, options, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", guildId
        ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
        : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId), (0, createApplicationCommand_js_1.isContextApplicationCommand)(options)
        ? {
            name: options.name,
            type: options.type,
        }
        : {
            name: options.name,
            description: options.description,
            type: options.type,
            options: options.options ? (0, createApplicationCommand_js_1.makeOptionsForCommand)(options.options) : undefined,
        });
    return bot.transformers.applicationCommand(bot, result);
}
exports.upsertApplicationCommand = upsertApplicationCommand;
