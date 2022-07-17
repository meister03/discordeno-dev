import type { Bot } from "../../bot.js";
/** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
export declare function createStageInstance(bot: Bot, options: CreateStageInstance): Promise<import("../../mod.js").StageInstance>;
export interface CreateStageInstance {
    channelId: bigint;
    topic: string;
    /** Notify @everyone that the stage instance has started. Requires the MENTION_EVERYONE permission. */
    sendStartNotification?: boolean;
}
