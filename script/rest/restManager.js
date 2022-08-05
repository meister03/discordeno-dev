"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestManager = void 0;
const checkRateLimits_js_1 = require("./checkRateLimits.js");
const cleanupQueues_js_1 = require("./cleanupQueues.js");
const createRequestBody_js_1 = require("./createRequestBody.js");
const processGlobalQueue_js_1 = require("./processGlobalQueue.js");
const processQueue_js_1 = require("./processQueue.js");
const processRateLimitedPaths_js_1 = require("./processRateLimitedPaths.js");
const processRequest_js_1 = require("./processRequest.js");
const processRequestHeaders_js_1 = require("./processRequestHeaders.js");
const convertRestError_js_1 = require("./convertRestError.js");
const runMethod_js_1 = require("./runMethod.js");
const simplifyUrl_js_1 = require("./simplifyUrl.js");
const constants_js_1 = require("../util/constants.js");
const constants_js_2 = require("../util/constants.js");
const token_js_1 = require("../util/token.js");
const sendRequest_js_1 = require("./sendRequest.js");
function createRestManager(options) {
    const version = options.version || constants_js_2.API_VERSION;
    if (options.customUrl) {
        constants_js_1.baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`;
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
        token: (0, token_js_1.removeTokenPrefix)(options.token),
        maxRetryCount: options.maxRetryCount || 10,
        secretKey: options.secretKey || "discordeno_best_lib_ever",
        customUrl: options.customUrl || "",
        pathQueues: new Map(),
        processingQueue: false,
        processingRateLimitedPaths: false,
        globallyRateLimited: false,
        globalQueue: [],
        globalQueueProcessing: false,
        rateLimitedPaths: new Map(),
        debug: options.debug || function (_text) { },
        checkRateLimits: options.checkRateLimits || checkRateLimits_js_1.checkRateLimits,
        cleanupQueues: options.cleanupQueues || cleanupQueues_js_1.cleanupQueues,
        processQueue: options.processQueue || processQueue_js_1.processQueue,
        processRateLimitedPaths: options.processRateLimitedPaths || processRateLimitedPaths_js_1.processRateLimitedPaths,
        processRequestHeaders: options.processRequestHeaders || processRequestHeaders_js_1.processRequestHeaders,
        processRequest: options.processRequest || processRequest_js_1.processRequest,
        createRequestBody: options.createRequestBody || createRequestBody_js_1.createRequestBody,
        runMethod: options.runMethod || runMethod_js_1.runMethod,
        simplifyUrl: options.simplifyUrl || simplifyUrl_js_1.simplifyUrl,
        processGlobalQueue: options.processGlobalQueue || processGlobalQueue_js_1.processGlobalQueue,
        convertRestError: options.convertRestError || convertRestError_js_1.convertRestError,
        sendRequest: options.sendRequest || sendRequest_js_1.sendRequest,
    };
}
exports.createRestManager = createRestManager;
