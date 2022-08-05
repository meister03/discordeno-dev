import { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events. */
export declare function modifyRolePositions(bot: Bot, guildId: bigint, options: ModifyRolePositions[]): Promise<Collection<bigint, import("../../mod.js").Role>>;
export interface ModifyRolePositions {
    /** The role id */
    id: bigint;
    /** The sorting position for the role. */
    position?: number | null;
}
