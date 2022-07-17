import type { Bot } from "../../../bot.js";
import { ApplicationCommandPermissionTypes } from "../../../types/shared.js";
/** Edits command permissions for a specific command for your application in a guild. */
export declare function editApplicationCommandPermissions(bot: Bot, guildId: bigint, commandId: bigint, 
/** Bearer token which has the `applications.commands.permissions.update` scope and also access to this guild.  */
bearerToken: string, options: ApplicationCommandPermissions[]): Promise<import("../../../mod.js").ApplicationCommandPermission>;
/** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
export interface ApplicationCommandPermissions {
    /** The id of the role or user */
    id: string;
    /** Role or User */
    type: ApplicationCommandPermissionTypes;
    /** `true` to allow, `false`, to disallow */
    permission: boolean;
}
