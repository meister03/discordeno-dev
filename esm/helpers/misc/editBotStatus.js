export async function editBotStatus(bot, data) {
    await Promise.all(bot.gateway.manager.shards.map((shard) => bot.helpers.editShardStatus(shard.id, data)));
}
