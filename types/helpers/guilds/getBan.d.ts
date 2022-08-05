import type { Bot } from "../../bot.js";
/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export declare function getBan(bot: Bot, guildId: bigint, memberId: bigint): Promise<{
    reason: string | null;
    user: import("../../mod.js").User;
} | undefined>;
