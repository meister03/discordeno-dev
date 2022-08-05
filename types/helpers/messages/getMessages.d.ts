import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export declare function getMessages(bot: Bot, channelId: bigint, options?: GetMessagesOptions): Promise<Collection<bigint, import("../../mod.js").Message>>;
/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
    /** Max number of messages to return (1-100) default 50 */
    limit?: number;
}
/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
    /** Get messages around this message id */
    around?: bigint;
}
/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
    /** Get messages before this message id */
    before?: bigint;
}
/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
    /** Get messages after this message id */
    after?: bigint;
}
export declare type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit;
export declare function isGetMessagesAfter(options: GetMessagesOptions): options is GetMessagesAfter;
export declare function isGetMessagesBefore(options: GetMessagesOptions): options is GetMessagesBefore;
export declare function isGetMessagesAround(options: GetMessagesOptions): options is GetMessagesAround;
export declare function isGetMessagesLimit(options: GetMessagesOptions): options is GetMessagesLimit;
