"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertApplicationCommands = void 0;
const collection_js_1 = require("../../../util/collection.js");
const createApplicationCommand_js_1 = require("./createApplicationCommand.js");
/**
 * Bulk edit existing application commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any application commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
async function upsertApplicationCommands(bot, options, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "PUT", guildId
        ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
        : bot.constants.routes.COMMANDS(bot.applicationId), options.map((option) => ((0, createApplicationCommand_js_1.isContextApplicationCommand)(option)
        ? {
            name: option.name,
            type: option.type,
        }
        : {
            name: option.name,
            description: option.description,
            type: option.type,
            options: option.options ? (0, createApplicationCommand_js_1.makeOptionsForCommand)(option.options) : undefined,
        })));
    return new collection_js_1.Collection(result.map((res) => {
        const command = bot.transformers.applicationCommand(bot, res);
        return [command.id, command];
    }));
}
exports.upsertApplicationCommands = upsertApplicationCommands;
