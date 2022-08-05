import { GatewayOpcodes } from "../../types/shared.js";
export function editShardStatus(bot, shardId, data) {
    const shard = bot.gateway.manager.shards.get(shardId);
    if (!shard) {
        throw new Error(`Shard (id: ${shardId}) not found.`);
    }
    shard.send({
        op: GatewayOpcodes.PresenceUpdate,
        d: {
            since: null,
            afk: false,
            activities: data.activities.map((activity) => ({
                name: activity.name,
                type: activity.type,
                url: activity.url,
                created_at: activity.createdAt,
                timestamps: activity.startedAt || activity.endedAt
                    ? {
                        start: activity.startedAt,
                        end: activity.endedAt,
                    }
                    : undefined,
                application_id: activity.applicationId?.toString(),
                details: activity.details,
                state: activity.state,
                emoji: activity.emoji
                    ? {
                        name: activity.emoji.name,
                        id: activity.emoji.id?.toString(),
                        animated: activity.emoji.animated,
                    }
                    : undefined,
                party: activity.partyId
                    ? {
                        id: activity.partyId.toString(),
                        size: activity.partyMaxSize,
                    }
                    : undefined,
                assets: activity.largeImage || activity.largeText || activity.smallImage || activity.smallText
                    ? {
                        large_image: activity.largeImage,
                        large_text: activity.largeText,
                        small_image: activity.smallImage,
                        small_text: activity.smallText,
                    }
                    : undefined,
                secrets: activity.join || activity.spectate || activity.match
                    ? {
                        join: activity.join,
                        spectate: activity.spectate,
                        match: activity.match,
                    }
                    : undefined,
                instance: activity.instance,
                flags: activity.flags,
                buttons: activity.buttons,
            })),
            status: data.status,
        },
    });
}