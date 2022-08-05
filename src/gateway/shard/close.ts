import * as dntShim from "../../_dnt.shims.js";
import { Shard } from "./types.js";

export function close(shard: Shard, code: number, reason: string): void {
  if (shard.socket?.readyState !== dntShim.WebSocket.OPEN) return;

  return shard.socket?.close(code, reason);
}
