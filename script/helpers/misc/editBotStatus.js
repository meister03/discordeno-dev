"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBotStatus = void 0;
async function editBotStatus(bot, data) {
    await Promise.all(bot.gateway.manager.shards.map((shard) => bot.helpers.editShardStatus(shard.id, data)));
}
exports.editBotStatus = editBotStatus;
