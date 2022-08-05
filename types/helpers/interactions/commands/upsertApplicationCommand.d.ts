import type { Bot } from "../../../bot.js";
import { CreateApplicationCommand, CreateContextApplicationCommand } from "./createApplicationCommand.js";
import { AtLeastOne } from "../../../types/shared.js";
/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export declare function upsertApplicationCommand(bot: Bot, commandId: bigint, options: AtLeastOne<CreateApplicationCommand> | AtLeastOne<CreateContextApplicationCommand>, guildId?: bigint): Promise<import("../../../mod.js").ApplicationCommand>;
