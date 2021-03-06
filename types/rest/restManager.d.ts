import { checkRateLimits } from "./checkRateLimits.js";
import { cleanupQueues } from "./cleanupQueues.js";
import { createRequestBody } from "./createRequestBody.js";
import { processGlobalQueue } from "./processGlobalQueue.js";
import { processQueue } from "./processQueue.js";
import { processRateLimitedPaths } from "./processRateLimitedPaths.js";
import { processRequest } from "./processRequest.js";
import { processRequestHeaders } from "./processRequestHeaders.js";
import { convertRestError } from "./convertRestError.js";
import { RestPayload, RestRateLimitedPath, RestRequest } from "./rest.js";
import { runMethod } from "./runMethod.js";
import { simplifyUrl } from "./simplifyUrl.js";
import { sendRequest } from "./sendRequest.js";
export declare function createRestManager(options: CreateRestManagerOptions): {
    invalidRequests: number;
    maxInvalidRequests: number;
    invalidRequestsInterval: number;
    invalidRequestsTimeoutId: number;
    invalidRequestsSafetyAmount: number;
    invalidRequestFrozenAt: number;
    invalidRequestErrorStatuses: number[];
    version: number;
    token: string;
    maxRetryCount: number;
    secretKey: string;
    customUrl: string;
    pathQueues: Map<string, {
        isWaiting: boolean;
        requests: {
            request: RestRequest;
            payload: RestPayload;
        }[];
    }>;
    processingQueue: boolean;
    processingRateLimitedPaths: boolean;
    globallyRateLimited: boolean;
    globalQueue: {
        request: RestRequest;
        payload: RestPayload;
        basicURL: string;
        urlToUse: string;
    }[];
    globalQueueProcessing: boolean;
    rateLimitedPaths: Map<string, RestRateLimitedPath>;
    debug: (text: string) => unknown;
    checkRateLimits: typeof checkRateLimits;
    cleanupQueues: typeof cleanupQueues;
    processQueue: typeof processQueue;
    processRateLimitedPaths: typeof processRateLimitedPaths;
    processRequestHeaders: typeof processRequestHeaders;
    processRequest: typeof processRequest;
    createRequestBody: typeof createRequestBody;
    runMethod: typeof runMethod;
    simplifyUrl: typeof simplifyUrl;
    processGlobalQueue: typeof processGlobalQueue;
    convertRestError: typeof convertRestError;
    sendRequest: typeof sendRequest;
};
export interface CreateRestManagerOptions {
    token: string;
    customUrl?: string;
    maxRetryCount?: number;
    version?: number;
    secretKey?: string;
    debug?: (text: string) => unknown;
    checkRateLimits?: typeof checkRateLimits;
    cleanupQueues?: typeof cleanupQueues;
    processQueue?: typeof processQueue;
    processRateLimitedPaths?: typeof processRateLimitedPaths;
    processRequestHeaders?: typeof processRequestHeaders;
    processRequest?: typeof processRequest;
    createRequestBody?: typeof createRequestBody;
    runMethod?: typeof runMethod;
    simplifyUrl?: typeof simplifyUrl;
    processGlobalQueue?: typeof processGlobalQueue;
    convertRestError?: typeof convertRestError;
    sendRequest?: typeof sendRequest;
}
export declare type RestManager = ReturnType<typeof createRestManager>;
