import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
import { DiscordDiscoveryCategory } from "../../types/discord.js";
/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
export declare function getDiscoveryCategories(bot: Bot): Promise<Collection<number, DiscordDiscoveryCategory>>;
