/** Deletes a application command. */
export async function deleteApplicationCommand(bot, id, guildId) {
    await bot.rest.runMethod(bot.rest, "DELETE", guildId
        ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, id)
        : bot.constants.routes.COMMANDS_ID(bot.applicationId, id));
}
