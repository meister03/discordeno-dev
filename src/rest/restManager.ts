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
import { baseEndpoints } from "../util/constants.js";
import { API_VERSION } from "../util/constants.js";
import { removeTokenPrefix } from "../util/token.js";
import { sendRequest } from "./sendRequest.js";

export function createRestManager(options: CreateRestManagerOptions) {
  const version = options.version || API_VERSION;

  if (options.customUrl) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`;
  }

  return {
    // current invalid amount
    invalidRequests: 0,
    // max invalid requests allowed until ban
    maxInvalidRequests: 10000,
    // 10 minutes
    invalidRequestsInterval: 600000,
    // timer to reset to 0
    invalidRequestsTimeoutId: 0,
    // how safe to be from max
    invalidRequestsSafetyAmount: 1,
    // when first request in this period was made
    invalidRequestFrozenAt: 0,
    invalidRequestErrorStatuses: [401, 403, 429],
    version,
    token: removeTokenPrefix(options.token),
    maxRetryCount: options.maxRetryCount || 10,
    secretKey: options.secretKey || "discordeno_best_lib_ever",
    customUrl: options.customUrl || "",
    pathQueues: new Map<
      string,
      {
        isWaiting: boolean;
        requests: {
          request: RestRequest;
          payload: RestPayload;
        }[];
      }
    >(),
    processingQueue: false,
    processingRateLimitedPaths: false,
    globallyRateLimited: false,
    globalQueue: [] as {
      request: RestRequest;
      payload: RestPayload;
      basicURL: string;
      urlToUse: string;
    }[],
    globalQueueProcessing: false,
    rateLimitedPaths: new Map<string, RestRateLimitedPath>(),
    debug: options.debug || function (_text: string) {},
    checkRateLimits: options.checkRateLimits || checkRateLimits,
    cleanupQueues: options.cleanupQueues || cleanupQueues,
    processQueue: options.processQueue || processQueue,
    processRateLimitedPaths: options.processRateLimitedPaths || processRateLimitedPaths,
    processRequestHeaders: options.processRequestHeaders || processRequestHeaders,
    processRequest: options.processRequest || processRequest,
    createRequestBody: options.createRequestBody || createRequestBody,
    runMethod: options.runMethod || runMethod,
    simplifyUrl: options.simplifyUrl || simplifyUrl,
    processGlobalQueue: options.processGlobalQueue || processGlobalQueue,
    convertRestError: options.convertRestError || convertRestError,
    sendRequest: options.sendRequest || sendRequest,
  };
}

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

export type RestManager = ReturnType<typeof createRestManager>;
