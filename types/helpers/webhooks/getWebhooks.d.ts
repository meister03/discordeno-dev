import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export declare function getWebhooks(bot: Bot, guildId: bigint): Promise<Collection<bigint, import("../../mod.js").Webhook>>;
