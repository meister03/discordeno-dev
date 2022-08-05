import { Collection } from "../../../util/collection.js";
/** Fetch all the commands for your application. If a guild id is not provided, it will fetch global commands. */
export async function getApplicationCommands(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", guildId
        ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
        : bot.constants.routes.COMMANDS(bot.applicationId));
    return new Collection(result.map((res) => {
        const command = bot.transformers.applicationCommand(bot, res);
        return [command.id, command];
    }));
}
