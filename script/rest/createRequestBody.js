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
exports.createRequestBody = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const constants_js_1 = require("../util/constants.js");
/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
// export function createRequestBody(rest: RestManager, queuedRequest: { request: RestRequest; payload: RestPayload }) {
function createRequestBody(rest, options) {
    const headers = {
        "user-agent": constants_js_1.USER_AGENT,
    };
    if (!options.unauthorized)
        headers["authorization"] = `Bot ${rest.token}`;
    // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
    if (options.headers) {
        for (const key in options.headers) {
            headers[key.toLowerCase()] = options.headers[key];
        }
    }
    // GET METHODS SHOULD NOT HAVE A BODY
    if (options.method === "GET") {
        options.body = undefined;
    }
    // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
    if (options.body?.reason) {
        headers["X-Audit-Log-Reason"] = encodeURIComponent(options.body.reason);
        options.body.reason = undefined;
    }
    // IF A FILE/ATTACHMENT IS PRESENT WE NEED SPECIAL HANDLING
    if (options.body?.file) {
        if (!Array.isArray(options.body.file)) {
            options.body.file = [options.body.file];
        }
        const form = new dntShim.FormData();
        for (let i = 0; i < options.body.file.length; i++) {
            form.append(`file${i}`, options.body.file[i].blob, options.body.file[i].name);
        }
        form.append("payload_json", JSON.stringify({ ...options.body, file: undefined }));
        options.body.file = form;
    }
    else if (options.body && !["GET", "DELETE"].includes(options.method)) {
        headers["Content-Type"] = "application/json";
    }
    return {
        headers,
        body: (options.body?.file ?? JSON.stringify(options.body)),
        method: options.method,
    };
}
exports.createRequestBody = createRequestBody;
