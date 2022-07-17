import type { Bot } from "../../bot.js";
/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export declare function getUser(bot: Bot, userId: bigint): Promise<import("../../mod.js").User | undefined>;
