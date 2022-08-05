import type { Bot } from "../../bot.js";
/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export declare function getGatewayBot(bot: Bot): Promise<import("../../mod.js").GetGatewayBot>;
