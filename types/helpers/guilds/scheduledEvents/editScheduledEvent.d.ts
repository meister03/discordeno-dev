import { Bot } from "../../../bot.js";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel, ScheduledEventStatus } from "../../../types/shared.js";
/** Modify a guild scheduled event. To start or end an event, use this endpoint to modify the event's status. */
export declare function editScheduledEvent(bot: Bot, guildId: bigint, eventId: bigint, options: Partial<EditScheduledEvent>): Promise<import("../../../mod.js").ScheduledEvent>;
export interface EditScheduledEvent {
    /** the channel id of the scheduled event. null if switching to external event. */
    channelId: bigint | null;
    /** location of the event */
    location?: string;
    /** the name of the scheduled event */
    name: string;
    /** the description of the scheduled event */
    description?: string;
    /** the time the scheduled event will start */
    scheduledStartTime: number;
    /** the time the scheduled event will end if it does end. */
    scheduledEndTime?: number;
    /** the privacy level of the scheduled event */
    privacyLevel: ScheduledEventPrivacyLevel;
    /** the type of hosting entity associated with a scheduled event */
    entityType: ScheduledEventEntityType;
    /** the status of the scheduled event */
    status: ScheduledEventStatus;
    reason?: string;
}
