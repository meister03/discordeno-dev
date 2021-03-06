/// <reference types="ws" />
import { DiscordGatewayPayload } from "../../types/discord.js";
import { PickPartial } from "../../types/shared.js";
import { Collection } from "../../util/collection.js";
import { CreateShard } from "../shard/createShard.js";
import { Shard, ShardGatewayConfig } from "../shard/types.js";
/** This is a Shard manager.
 * This does not manage a specific range of Shard but the provided Shards on create or when an identify is requested.
 * The aim of this is to provide an easy to use manager which can be used by workers or any other kind of separate process.
 */
export declare type ShardManager = ReturnType<typeof createShardManager>;
/** Create a new Shard manager.
 * This does not manage a specific range of Shard but the provided Shards on create or when an identify is requested.
 * The aim of this is to provide an easy to use manager which can be used by workers or any other kind of separate process.
 */
export declare function createShardManager(options: CreateShardManager): {
    /** Options which are used to create a new Shard. */
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
                bucket: import("../../util/bucket.js").LeakyBucket;
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
        bucket?: import("../../util/bucket.js").LeakyBucket | undefined;
        offlineSendQueue?: import("../shard/types.js").ShardSocketRequest[] | undefined;
        resolves?: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void> | undefined;
    };
    /** Gateway configuration which is used when creating a Shard. */
    gatewayConfig: PickPartial<ShardGatewayConfig, "token">;
    /** Managed Shards. */
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
        bucket: import("../../util/bucket.js").LeakyBucket;
        handleClose: (close: CloseEvent) => Promise<void>;
        handleMessage: (message: MessageEvent<any>) => Promise<void>;
        requestIdentify: () => Promise<void>;
        offlineSendQueue: ((_?: unknown) => void)[];
        resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;
        startHeartbeating: (interval: number) => void;
        stopHeartbeating: () => void;
    }>;
    /** Total amount of Shards used by the bot. */
    totalShards: number;
    /** Tell the manager to identify a Shard.
     * If this Shard is not already managed this will also add the Shard to the manager.
     */
    identify: (shardId: number) => Promise<void>;
    /** Kill a shard.
     * Close a shards connection to Discord's gateway (if any) and remove it from the manager.
     */
    kill: (shardId: number) => Promise<void>;
    /** This function communicates with the parent manager,
     * in order to know whether this manager is allowed to identify a new shard.
     */
    requestIdentify: (shardId: number) => Promise<void>;
};
export interface CreateShardManager {
    /** Options which are used to create a new Shard. */
    createShardOptions?: Omit<CreateShard, "id" | "totalShards" | "requestIdentify" | "gatewayConfig">;
    /** Gateway configuration which is used when creating a Shard. */
    gatewayConfig: PickPartial<ShardGatewayConfig, "token">;
    /** Ids of the Shards which should be managed. */
    shardIds: number[];
    /** Total amount of Shard used by the bot. */
    totalShards: number;
    /** This function is used when a shard receives any message from Discord. */
    handleMessage(shard: Shard, message: DiscordGatewayPayload): unknown;
    /** This function communicates with the parent manager,
     * in order to know whether this manager is allowed to identify a new shard. #
     */
    requestIdentify(shardId: number): Promise<void>;
}
