/// <reference types="node" />
import { Deno } from "@deno/shim-deno";
export { Deno } from "@deno/shim-deno";
import { Blob } from "buffer";
export { Blob } from "buffer";
import { setInterval, setTimeout } from "@deno/shim-timers";
export { setInterval, setTimeout } from "@deno/shim-timers";
import { fetch, File, FormData, Headers, Request, Response } from "undici";
export { fetch, File, FormData, Headers, Request, Response, type BodyInit, type HeadersInit, type RequestInit, type ResponseInit } from "undici";
import { default as WebSocket } from "ws";
export { default as WebSocket } from "ws";
export declare const dntGlobalThis: Omit<typeof globalThis, "fetch" | "setInterval" | "setTimeout" | "Blob" | "File" | "FormData" | "Headers" | "Request" | "Response" | "WebSocket" | "Deno"> & {
    Deno: typeof Deno;
    Blob: typeof Blob;
    setInterval: typeof setInterval;
    setTimeout: typeof setTimeout;
    fetch: typeof fetch;
    File: typeof File;
    FormData: typeof FormData;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
    WebSocket: typeof WebSocket;
};
