"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const dntShim = __importStar(require("../../_dnt.shims.js"));
const shared_js_1 = require("../../types/shared.js");
const bucket_js_1 = require("../../util/bucket.js");
const utils_js_1 = require("../../util/utils.js");
const deps_js_1 = require("./deps.js");
const types_js_1 = require("./types.js");
const decoder = new TextDecoder();
async function handleMessage(shard, message) {
    message = message.data;
    // If message compression is enabled,
    // Discord might send zlib compressed payloads.
    if (shard.gatewayConfig.compress && message instanceof dntShim.Blob) {
        message = (0, deps_js_1.decompressWith)(new Uint8Array(await message.arrayBuffer()), 0, (slice) => decoder.decode(slice));
    }
    // Safeguard incase decompression failed to make a string.
    if (typeof message !== "string")
        return;
    const messageData = JSON.parse(message);
    //   gateway.debug("GW RAW", { shardId, payload: messageData });
    // TODO: remove
    // console.log({ messageData: censor(messageData) });
    switch (messageData.op) {
        case shared_js_1.GatewayOpcodes.Heartbeat: {
            // TODO: can this actually happen
            if (!shard.isOpen())
                return;
            shard.heart.lastBeat = Date.now();
            // Discord randomly sends this requiring an immediate heartbeat back.
            // Using a direct socket.send call here because heartbeat requests are reserved by us.
            shard.socket?.send(JSON.stringify({
                op: shared_js_1.GatewayOpcodes.Heartbeat,
                d: shard.previousSequenceNumber,
            }));
            shard.events.heartbeat?.(shard);
            break;
        }
        case shared_js_1.GatewayOpcodes.Hello: {
            const interval = messageData.d.heartbeat_interval;
            shard.startHeartbeating(interval);
            if (shard.state !== types_js_1.ShardState.Resuming) {
                // HELLO has been send on a non resume action.
                // This means that the shard starts a new session,
                // therefore the rate limit interval has been reset too.
                shard.bucket = (0, bucket_js_1.createLeakyBucket)({
                    max: shard.calculateSafeRequests(),
                    refillInterval: types_js_1.GATEWAY_RATE_LIMIT_RESET_INTERVAL,
                    refillAmount: shard.calculateSafeRequests(),
                    // Waiting acquires should not be lost on a re-identify.
                    waiting: shard.bucket.waiting,
                });
            }
            shard.events.hello?.(shard);
            break;
        }
        case shared_js_1.GatewayOpcodes.HeartbeatACK: {
            shard.heart.acknowledged = true;
            shard.heart.lastAck = Date.now();
            // Manually calculating the round trip time for users who need it.
            if (shard.heart.lastBeat) {
                shard.heart.rtt = shard.heart.lastAck - shard.heart.lastBeat;
            }
            shard.events.heartbeatAck?.(shard);
            break;
        }
        case shared_js_1.GatewayOpcodes.Reconnect: {
            //   gateway.debug("GW RECONNECT", { shardId });
            shard.events.requestedReconnect?.(shard);
            await shard.resume();
            break;
        }
        case shared_js_1.GatewayOpcodes.InvalidSession: {
            //   gateway.debug("GW INVALID_SESSION", { shardId, payload: messageData });
            const resumable = messageData.d;
            shard.events.invalidSession?.(shard, resumable);
            // We need to wait for a random amount of time between 1 and 5
            // Reference: https://discord.com/developers/docs/topics/gateway#resuming
            await (0, utils_js_1.delay)(Math.floor((Math.random() * 4 + 1) * 1000));
            shard.resolves.get("INVALID_SESSION")?.(messageData);
            shard.resolves.delete("INVALID_SESSION");
            // When resumable is false we need to re-identify
            if (!resumable) {
                await shard.identify();
                break;
            }
            // The session is invalid but apparently it is resumable
            await shard.resume();
            break;
        }
    }
    if (messageData.t === "RESUMED") {
        // gateway.debug("GW RESUMED", { shardId });
        shard.state = types_js_1.ShardState.Connected;
        shard.events.resumed?.(shard);
        // Continue the requests which have been queued since the shard went offline.
        shard.offlineSendQueue.map((resolve) => resolve());
        shard.resolves.get("RESUMED")?.(messageData);
        shard.resolves.delete("RESUMED");
    } // Important for future resumes.
    else if (messageData.t === "READY") {
        const payload = messageData.d;
        shard.sessionId = payload.session_id;
        shard.state = types_js_1.ShardState.Connected;
        // Continue the requests which have been queued since the shard went offline.
        // Important when this is a re-identify
        shard.offlineSendQueue.map((resolve) => resolve());
        shard.resolves.get("READY")?.(messageData);
        shard.resolves.delete("READY");
    }
    // Update the sequence number if it is present
    // `s` can be either `null` or a `number`.
    // In order to prevent update misses when `s` is `0` we check against null.
    if (messageData.s !== null) {
        shard.previousSequenceNumber = messageData.s;
    }
    // The necessary handling required for the Shards connection has been finished.
    // Now the event can be safely forwarded.
    shard.events.message?.(shard, messageData);
}
exports.handleMessage = handleMessage;
