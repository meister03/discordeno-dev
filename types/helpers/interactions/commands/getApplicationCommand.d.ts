import type { Bot } from "../../../bot.js";
/** Fetches the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export declare function getApplicationCommand(bot: Bot, commandId: bigint, options?: GetApplicationCommand): Promise<import("../../../mod.js").ApplicationCommand>;
/** https://discord.com/developers/docs/interactions/application-commands#endpoints-query-string-params */
export interface GetApplicationCommand {
    /** Guild ID of the guild in which the command is available if it is a guild-specific command */
    guildId?: bigint;
    /** Whether to include full localization object (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields. Default false */
    withLocalizations?: boolean;
}
