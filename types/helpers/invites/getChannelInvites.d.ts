import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export declare function getChannelInvites(bot: Bot, channelId: bigint): Promise<Collection<string, {
    uses: number;
    maxUses: number;
    maxAge: number;
    temporary: boolean;
    createdAt: number;
}>>;
