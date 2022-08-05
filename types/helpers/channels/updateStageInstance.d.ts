import type { Bot } from "../../bot.js";
import { DiscordStageInstance } from "../../types/discord.js";
import { AtLeastOne } from "../../types/shared.js";
/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export declare function updateStageInstance(bot: Bot, channelId: bigint, data: AtLeastOne<Pick<DiscordStageInstance, "topic">>): Promise<import("../../mod.js").StageInstance>;
