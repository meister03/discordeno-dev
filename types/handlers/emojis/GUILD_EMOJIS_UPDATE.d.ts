import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildEmojisUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
