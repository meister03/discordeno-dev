import type { Bot } from "../../bot.js";
/** Modifies the bot's username or avatar.
 * NOTE: username: if changed may cause the bot's discriminator to be randomized.
 */
export declare function editBotProfile(bot: Bot, options: {
    username?: string;
    botAvatarURL?: string | null;
}): Promise<import("../../mod.js").User>;
