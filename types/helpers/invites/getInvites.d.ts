import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export declare function getInvites(bot: Bot, guildId: bigint): Promise<Collection<string, {
    uses: number;
    maxUses: number;
    maxAge: number;
    temporary: boolean;
    createdAt: number;
}>>;
