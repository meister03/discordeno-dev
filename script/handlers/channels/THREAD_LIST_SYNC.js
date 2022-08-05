"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleThreadListSync = void 0;
async function handleThreadListSync(bot, data) {
    const payload = data.d;
    const guildId = bot.transformers.snowflake(payload.guild_id);
    return {
        guildId,
        channelIds: payload.channel_ids?.map((id) => bot.transformers.snowflake(id)),
        threads: payload.threads.map((thread) => bot.transformers.channel(bot, { channel: thread, guildId })),
        members: payload.members.map((member) => ({
            id: member.id ? bot.transformers.snowflake(member.id) : undefined,
            userId: member.user_id ? bot.transformers.snowflake(member.user_id) : undefined,
            joinTimestamp: Date.parse(member.join_timestamp),
        })),
    };
}
exports.handleThreadListSync = handleThreadListSync;