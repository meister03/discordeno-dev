"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReady = void 0;
function handleReady(bot, data, shardId) {
    const payload = data.d;
    // Triggered on each shard
    bot.events.ready(bot, {
        shardId,
        v: payload.v,
        user: bot.transformers.user(bot, payload.user),
        guilds: payload.guilds.map((p) => bot.transformers.snowflake(p.id)),
        sessionId: payload.session_id,
        shard: payload.shard,
        applicationId: bot.transformers.snowflake(payload.application.id),
    }, payload);
    if (!bot.id)
        bot.id = bot.transformers.snowflake(payload.user.id);
    if (!bot.applicationId)
        bot.applicationId = bot.transformers.snowflake(payload.application.id);
}
exports.handleReady = handleReady;
