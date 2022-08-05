import type { Bot } from "../../../bot.js";
import { Collection } from "../../../util/collection.js";
import { CreateApplicationCommand, CreateContextApplicationCommand } from "./createApplicationCommand.js";
/**
 * Bulk edit existing application commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any application commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export declare function upsertApplicationCommands(bot: Bot, options: (UpsertApplicationCommands | CreateContextApplicationCommand)[], guildId?: bigint): Promise<Collection<bigint, import("../../../mod.js").ApplicationCommand>>;
export interface UpsertApplicationCommands extends CreateApplicationCommand {
    /** ID of the command, if known */
    id?: bigint;
}
