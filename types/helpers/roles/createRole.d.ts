import type { Bot } from "../../bot.js";
import { PermissionStrings } from "../../types/shared.js";
/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export declare function createRole(bot: Bot, guildId: bigint, options: CreateGuildRole, reason?: string): Promise<import("../../mod.js").Role>;
export interface CreateGuildRole {
    /** Name of the role, default: "new role" */
    name?: string;
    /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
    permissions?: PermissionStrings[];
    /** RGB color value, default: 0 */
    color?: number;
    /** Whether the role should be displayed separately in the sidebar, default: false */
    hoist?: boolean;
    /** Whether the role should be mentionable, default: false */
    mentionable?: boolean;
    /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
    unicodeEmoji?: string;
    /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
    icon?: string;
}
