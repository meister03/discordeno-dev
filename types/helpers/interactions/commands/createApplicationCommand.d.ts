import type { Bot } from "../../../bot.js";
import { ApplicationCommandOption, ApplicationCommandTypes, Localization } from "../../../mod.js";
import { DiscordApplicationCommandOption } from "../../../types/discord.js";
import { AtLeastOne, PermissionStrings } from "../../../types/shared.js";
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
export declare function createApplicationCommand(bot: Bot, options: CreateApplicationCommand | CreateContextApplicationCommand, guildId?: bigint): Promise<import("../../../mod.js").ApplicationCommand>;
export declare function makeOptionsForCommand(options: ApplicationCommandOption[]): DiscordApplicationCommandOption[];
/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateApplicationCommand {
    /**
     * Name of command, 1-32 characters.
     * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
     * If there is a lowercase variant of any letters used, you must use those.
     * Characters with no lowercase variants and/or uncased letters are still allowed.
     * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
     */
    name: string;
    /** Localization object for the `name` field. Values follow the same restrictions as `name` */
    nameLocalizations?: Localization;
    /** 1-100 character description */
    description: string;
    /** Localization object for the `description` field. Values follow the same restrictions as `description` */
    descriptionLocalizations?: Localization;
    /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
    type?: ApplicationCommandTypes;
    /** Parameters for the command */
    options?: ApplicationCommandOption[];
    /** Set of permissions represented as a bit set */
    defaultMemberPermissions?: PermissionStrings[];
    /** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
    dmPermission?: boolean;
}
/** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
export interface CreateContextApplicationCommand extends Omit<CreateApplicationCommand, "options"> {
    /** The type of the command */
    type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User;
}
export declare function isContextApplicationCommand(cmd: AtLeastOne<CreateContextApplicationCommand> | AtLeastOne<CreateApplicationCommand>): cmd is AtLeastOne<CreateContextApplicationCommand>;
