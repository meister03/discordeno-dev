import type { Bot } from "../../bot.js";
/** Returns the initial Interaction response. Functions the same as Get Webhook Message */
export declare function getOriginalInteractionResponse(bot: Bot, token: string): Promise<import("../../mod.js").Message>;
