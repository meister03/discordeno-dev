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
exports.runMethod = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const constants_js_1 = require("../util/constants.js");
async function runMethod(rest, method, route, body, options) {
    rest.debug(`[REST - RequestCreate] Method: ${method} | URL: ${route} | Retry Count: ${options?.retryCount ?? 0} | Bucket ID: ${options?.bucketId} | Body: ${JSON.stringify(body)}`);
    const errorStack = new Error("Location:");
    // @ts-ignore Breaks deno deploy. Luca said add ts-ignore until it's fixed
    Error.captureStackTrace(errorStack);
    // For proxies we don't need to do any of the legwork so we just forward the request
    if (!constants_js_1.baseEndpoints.BASE_URL.startsWith(constants_js_1.BASE_URL) && route[0] === "/") {
        const result = await dntShim.fetch(`${constants_js_1.baseEndpoints.BASE_URL}${route}`, {
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                Authorization: rest.secretKey,
                "Content-Type": "application/json",
            },
            method,
        }).catch((error) => {
            errorStack.message = error?.message;
            console.error(error);
            throw errorStack;
        });
        if (!result.ok) {
            errorStack.message = result.statusText;
            console.error(`Error: ${errorStack.message}`);
            throw errorStack;
        }
        return result.status !== 204 ? await result.json() : undefined;
    }
    // No proxy so we need to handle all rate limiting and such
    return new Promise((resolve, reject) => {
        rest.processRequest(rest, {
            url: route[0] === "/" ? `${constants_js_1.BASE_URL}/v${constants_js_1.API_VERSION}${route}` : route,
            method,
            reject: (data) => {
                const errorstack = new Error("Location:");
                const restError = rest.convertRestError(errorstack, data);
                reject(restError);
            },
            respond: (data) => resolve(data.status !== 204 ? JSON.parse(data.body ?? "{}") : undefined),
        }, {
            bucketId: options?.bucketId,
            body: body,
            retryCount: options?.retryCount ?? 0,
            headers: options?.headers,
        });
    });
}
exports.runMethod = runMethod;
