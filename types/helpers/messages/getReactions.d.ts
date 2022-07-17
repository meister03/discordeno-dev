import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Get a list of users that reacted with this emoji. */
export declare function getReactions(bot: Bot, channelId: bigint, messageId: bigint, reaction: string, options?: GetReactions): Promise<Collection<bigint, import("../../mod.js").User>>;
/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
    /** Get users after this user Id */
    after?: string;
    /** Max number of users to return (1-100) */
    limit?: number;
}
