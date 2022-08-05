import * as dntShim from "../../_dnt.shims.js";
import { Shard } from "./types.js";

export function isOpen(shard: Shard): boolean {
  return shard.socket?.readyState === dntShim.WebSocket.OPEN;
}
