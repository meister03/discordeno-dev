import { Bot } from "../../bot.js";
import { StatusUpdate } from "./editShardStatus.js";

export async function editBotStatus(bot: Bot, data: StatusUpdate) {
  await Promise.all(bot.gateway.manager.shards.map((shard) => bot.helpers.editShardStatus(shard.id, data)));
}
