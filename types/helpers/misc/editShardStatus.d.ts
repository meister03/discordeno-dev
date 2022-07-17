import type { Bot } from "../../bot.js";
import { Activity } from "../../transformers/activity.js";
import { StatusTypes } from "../../transformers/presence.js";
export declare function editShardStatus(bot: Bot, shardId: number, data: StatusUpdate): void;
/** https://discord.com/developers/docs/topics/gateway#update-status */
export interface StatusUpdate {
    /** The user's activities */
    activities: Activity[];
    /** The user's new status */
    status: StatusTypes;
}
