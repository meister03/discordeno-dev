import { GatewayOpcodes } from "../../types/shared.js";
/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export async function connectToVoiceChannel(bot, guildId, channelId, options) {
    const shardId = bot.utils.calculateShardId(bot.gateway, guildId);
    const shard = bot.gateway.manager.shards.get(shardId);
    if (!shard) {
        throw new Error(`Shard (id: ${shardId} not found`);
    }
    shard.send({
        op: GatewayOpcodes.VoiceStateUpdate,
        d: {
            guild_id: guildId.toString(),
            channel_id: channelId.toString(),
            self_mute: Boolean(options?.selfMute),
            self_deaf: options?.selfDeaf ?? true,
        },
    });
}
