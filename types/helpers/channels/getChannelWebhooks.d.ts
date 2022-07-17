import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export declare function getChannelWebhooks(bot: Bot, channelId: bigint): Promise<Collection<bigint, import("../../mod.js").Webhook>>;
