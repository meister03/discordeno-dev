/// <reference types="ws" />
import { GetGatewayBot } from "../../transformers/gatewayBot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
import { PickPartial } from "../../types/shared.js";
import { LeakyBucket } from "../../util/bucket.js";
import { Collection } from "../../util/collection.js";
import { CreateShard } from "../shard/createShard.js";
import { Shard, ShardGatewayConfig } from "../shard/types.js";
import { calculateTotalShards } from "./calculateTotalShards.js";
import { calculateWorkerId } from "./calculateWorkerId.js";
import { spawnShards } from "./spawnShards.js";
import { prepareBuckets } from "./prepareBuckets.js";
import { tellWorkerToIdentify } from "./tellWorkerToIdentify.js";
import { stop } from "./stop.js";
export declare type GatewayManager = ReturnType<typeof createGatewayManager>;
/** Create a new Gateway Manager.
 *
 * @param options: Customize every bit of the manager. If something is not
 * provided, it will fallback to a default which should be suitable for most
 * bots.
 */
export declare function createGatewayManager(options: PickPartial<CreateGatewayManager, "handleDiscordPayload" | "gatewayBot" | "gatewayConfig">): {
    /** The max concurrency buckets.
     * Those will be created when the `spawnShards` (which calls `prepareBuckets` under the hood) function gets called.
     */
    buckets: Collection<number, {
        workers: {
            id: number;
            queue: number[];
        }[];
        leak: LeakyBucket;
    }>;
    /** Id of the first Shard which should get controlled by this manager.
     *
     * NOTE: This is intended for testing purposes
     * if big bots want to test the gateway on smaller scale.
     * This is not recommended to be used in production.
     */
    firstShardId: number;
    /** Important data which is used by the manager to connect shards to the gateway. */
    gatewayBot: GetGatewayBot;
    /** Id of the last Shard which should get controlled by this manager.
     *
     * NOTE: This is intended for testing purposes
     * if big bots want to test the gateway on smaller scale.
     * This is not recommended to be used in production.
     */
    lastShardId: number;
    /** This is where the Shards get stored.
     * This will not be used when having a custom workers solution.
     */
    manager: {
        createShardOptions: {
            events: {
                message: (shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }, payload: DiscordGatewayPayload) => unknown;
                heartbeat?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                heartbeatAck?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                hello?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                invalidSession?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }, resumable: boolean) => unknown) | undefined;
                resuming?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                resumed?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                requestedReconnect?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                connecting?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                connected?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                disconnected?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                identifying?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
                identified?: ((shard: {
                    gatewayConfig: ShardGatewayConfig;
                    heart: import("../shard/types.js").ShardHeart;
                    id: number;
                    maxRequestsPerRateLimitTick: number;
                    previousSequenceNumber: number | null;
                    rateLimitResetInterval: number;
                    sessionId: string | undefined;
                    socket: import("ws") | undefined;
                    state: import("../shard/types.js").ShardState;
                    totalShards: number;
                    events: import("../shard/types.js").ShardEvents;
                    calculateSafeRequests: () => number;
                    close: (code: number, reason: string) => void;
                    connect: () => Promise<void>;
                    identify: () => Promise<void>;
                    isOpen: () => boolean;
                    makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
                    resume: () => Promise<void>;
                    send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
                    shutdown: () => Promise<void>;
                    bucket: LeakyBucket;
                    handleClose: (close: CloseEvent) => Promise<void>;
                    handleMessage: (message: MessageEvent<any>) => Promise<void>;
                    requestIdentify: () => Promise<void>;
                    offlineSendQueue: ((_?: unknown) => void)[];
                    resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
                    startHeartbeating: (interval: number) => void;
                    stopHeartbeating: () => void;
                }) => unknown) | undefined;
            };
            state?: import("../shard/types.js").ShardState | undefined;
            close?: typeof import("../mod.js").close | undefined;
            resume?: typeof import("../mod.js").resume | undefined;
            connect?: typeof import("../mod.js").connect | undefined;
            calculateSafeRequests?: typeof import("../mod.js").calculateSafeRequests | undefined;
            handleClose?: typeof import("../mod.js").handleClose | undefined;
            handleMessage?: typeof import("../mod.js").handleMessage | undefined;
            identify?: typeof import("../mod.js").identify | undefined;
            isOpen?: typeof import("../mod.js").isOpen | undefined;
            makePresence?: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
            maxRequestsPerRateLimitTick?: number | undefined;
            previousSequenceNumber?: number | undefined;
            rateLimitResetInterval?: number | undefined;
            send?: typeof import("../mod.js").send | undefined;
            shutdown?: typeof import("../mod.js").shutdown | undefined;
            startHeartbeating?: typeof import("../mod.js").startHeartbeating | undefined;
            stopHeartbeating?: typeof import("../mod.js").stopHeartbeating | undefined;
            heart?: import("../shard/types.js").ShardHeart | undefined;
            bucket?: LeakyBucket | undefined;
            offlineSendQueue?: import("../shard/types.js").ShardSocketRequest[] | undefined;
            resolves?: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void> | undefined;
        };
        gatewayConfig: PickPartial<ShardGatewayConfig, "token">;
        shards: Collection<number, {
            gatewayConfig: ShardGatewayConfig;
            heart: import("../shard/types.js").ShardHeart;
            id: number;
            maxRequestsPerRateLimitTick: number;
            previousSequenceNumber: number | null;
            rateLimitResetInterval: number;
            sessionId: string | undefined;
            socket: import("ws") | undefined;
            state: import("../shard/types.js").ShardState;
            totalShards: number;
            events: import("../shard/types.js").ShardEvents;
            calculateSafeRequests: () => number;
            close: (code: number, reason: string) => void;
            connect: () => Promise<void>;
            identify: () => Promise<void>;
            isOpen: () => boolean;
            makePresence: ((shardId: number) => import("../../mod.js").StatusUpdate | Promise<import("../../mod.js").StatusUpdate>) | undefined;
            resume: () => Promise<void>;
            send: (message: import("../shard/types.js").ShardSocketRequest, highPriority?: boolean) => Promise<void>;
            shutdown: () => Promise<void>;
            bucket: LeakyBucket;
            handleClose: (close: CloseEvent) => Promise<void>;
            handleMessage: (message: MessageEvent<any>) => Promise<void>;
            requestIdentify: () => Promise<void>;
            offlineSendQueue: ((_?: unknown) => void)[];
            resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
            startHeartbeating: (interval: number) => void;
            stopHeartbeating: () => void;
        }>;
        totalShards: number;
        identify: (shardId: number) => Promise<void>;
        kill: (shardId: number) => Promise<void>;
        requestIdentify: (shardId: number) => Promise<void>;
    };
    /** Delay in milliseconds to wait before spawning next shard.
     * OPTIMAL IS ABOVE 5100. YOU DON'T WANT TO HIT THE RATE LIMIT!!!
     */
    spawnShardDelay: number;
    /** How many Shards should get assigned to a Worker.
     *
     * IMPORTANT: Discordeno will NOT spawn Workers for you.
     * Instead you have to overwrite the `tellWorkerToIdentify` function to make that for you.
     * Look at the [BigBot template gateway solution](https://github.com/discordeno/discordeno/tree/main/template/bigbot/src/gateway) for reference.
     *
     * NOTE: The last Worker will IGNORE this value,
     * which means that the last worker can get assigned an unlimited amount of shards.
     * This is not a bug but intended behavior and means you have to assign more workers to this manager.
     */
    shardsPerWorker: number;
    /** The total amount of Workers which get controlled by this manager.
     *
     * IMPORTANT: Discordeno will NOT spawn Workers for you.
     * Instead you have to overwrite the `tellWorkerToIdentify` function to make that for you.
     * Look at the [BigBot template gateway solution](https://github.com/discordeno/discordeno/tree/main/template/bigbot/src/gateway) for reference.
     */
    totalWorkers: number;
    /** Prepares the buckets for identifying.
     *
     * NOTE: Most of the time this function does not need to be called,
     * since it gets called by the `spawnShards` function indirectly.
     */
    prepareBuckets: () => void;
    /** This function starts to spawn the Shards assigned to this manager.
     *
     * The managers `buckets` will be created and
     *
     * if `resharding.useOptimalLargeBotSharding` is set to true,
     * `totalShards` gets double checked and adjusted accordingly if wrong.
     */
    spawnShards: () => void;
    /** Stop the gateway. This closes all shards. */
    stop: (code: number, reason: string) => Promise<void>;
    /** Tell the Worker with this Id to identify this Shard.
     *
     * Useful if a custom Worker solution should be used.
     *
     * IMPORTANT: Discordeno will NOT spawn Workers for you.
     * Instead you have to overwrite the `tellWorkerToIdentify` function to make that for you.
     * Look at the [BigBot template gateway solution](https://github.com/discordeno/discordeno/tree/main/template/bigbot/src/gateway) for reference.
     */
    tellWorkerToIdentify: (workerId: number, shardId: number, bucketId: number) => Promise<void>;
    /** Handle the different logs. Used for debugging. */
    debug: (text: GatewayDebugEvents, ...args: any[]) => unknown;
    /** Calculate the amount of Shards which should be used based on the bot's max concurrency. */
    calculateTotalShards: () => number;
    /** Calculate the Id of the Worker related to this Shard. */
    calculateWorkerId: (shardId: number) => number;
};
export interface CreateGatewayManager {
    /** Delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 5100. YOU DON'T WANT TO HIT THE RATE LIMIT!!! */
    spawnShardDelay: number;
    /** Total amount of shards your bot uses. Useful for zero-downtime updates or resharding. */
    totalShards: number;
    /** The amount of shards to load per worker. */
    shardsPerWorker: number;
    /** The total amount of workers to use for your bot. */
    totalWorkers: number;
    /** Id of the first Shard which should get controlled by this manager.
     *
     * NOTE: This is intended for testing purposes
     * if big bots want to test the gateway on smaller scale.
     * This is not recommended to be used in production.
     */
    firstShardId: number;
    /** Id of the last Shard which should get controlled by this manager.
     *
     * NOTE: This is intended for testing purposes
     * if big bots want to test the gateway on smaller scale.
     * This is not recommended to be used in production.
     */
    lastShardId: number;
    /** Important data which is used by the manager to connect shards to the gateway. */
    gatewayBot: GetGatewayBot;
    gatewayConfig: PickPartial<ShardGatewayConfig, "token">;
    /** Options which are used to create a new shard. */
    createShardOptions?: Omit<CreateShard, "id" | "totalShards" | "requestIdentify" | "gatewayConfig">;
    /** Stored as bucketId: { workers: [workerId, [ShardIds]], createNextShard: boolean } */
    buckets: Collection<number, {
        workers: {
            id: number;
            queue: number[];
        }[];
        leak: LeakyBucket;
    }>;
    /** Prepares the buckets for identifying */
    prepareBuckets: typeof prepareBuckets;
    /** The handler for spawning ALL the shards. */
    spawnShards: typeof spawnShards;
    /** The handler to close all shards. */
    stop: typeof stop;
    /** Sends the discord payload to another server. */
    handleDiscordPayload: (shard: Shard, data: DiscordGatewayPayload) => any;
    /** Tell the worker to begin identifying this shard  */
    tellWorkerToIdentify: typeof tellWorkerToIdentify;
    /** Handle the different logs. Used for debugging. */
    debug: (text: GatewayDebugEvents, ...args: any[]) => unknown;
    /** The methods related to resharding. */
    /** Calculates the number of shards to use based on the max concurrency */
    calculateTotalShards: typeof calculateTotalShards;
    /** Calculate the id of the worker related ot this Shard. */
    calculateWorkerId: typeof calculateWorkerId;
}
export declare type GatewayDebugEvents = "GW ERROR" | "GW CLOSED" | "GW CLOSED_RECONNECT" | "GW RAW" | "GW RECONNECT" | "GW INVALID_SESSION" | "GW RESUMED" | "GW RESUMING" | "GW IDENTIFYING" | "GW RAW_SEND" | "GW MAX REQUESTS" | "GW DEBUG" | "GW HEARTBEATING" | "GW HEARTBEATING_STARTED" | "GW HEARTBEATING_DETAILS" | "GW HEARTBEATING_CLOSED";
