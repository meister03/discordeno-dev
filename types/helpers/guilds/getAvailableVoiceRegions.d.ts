import type { Bot } from "../../bot.js";
import { Collection } from "../../util/collection.js";
/** Returns an array of voice regions that can be used when creating servers. */
export declare function getAvailableVoiceRegions(bot: Bot): Promise<Collection<string, import("../../mod.js").VoiceRegions>>;
