import { Bot } from "../../../bot.js";
/** Get a guild scheduled event. */
export declare function getScheduledEvent(bot: Bot, guildId: bigint, eventId: bigint, options?: {
    withUserCount?: boolean;
}): Promise<import("../../../mod.js").ScheduledEvent | undefined>;
