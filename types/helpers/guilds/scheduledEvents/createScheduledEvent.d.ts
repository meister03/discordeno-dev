import { Bot } from "../../../bot.js";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../../../types/shared.js";
/** Create a guild scheduled event in the guild. A guild can have a maximum of 100 events with `SCHEDULED` or `ACTIVE` status at any time. */
export declare function createScheduledEvent(bot: Bot, guildId: bigint, options: CreateScheduledEvent): Promise<import("../../../mod.js").ScheduledEvent>;
export interface CreateScheduledEvent {
    /** the channel id of the scheduled event. */
    channelId?: bigint;
    /** location of the event. Required for events with `entityType: ScheduledEventEntityType.External` */
    location?: string;
    /** the name of the scheduled event */
    name: string;
    /** the description of the scheduled event */
    description: string;
    /** the time the scheduled event will start */
    scheduledStartTime: number;
    /** the time the scheduled event will end if it does end. Required for events with `entityType: ScheduledEventEntityType.External` */
    scheduledEndTime?: number;
    /** the privacy level of the scheduled event */
    privacyLevel?: ScheduledEventPrivacyLevel;
    /** the type of hosting entity associated with a scheduled event */
    entityType: ScheduledEventEntityType;
    reason?: string;
}
