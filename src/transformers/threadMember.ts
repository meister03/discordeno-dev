import { Bot } from "../bot.js";
import { DiscordThreadMember, DiscordThreadMemberGuildCreate } from "../types/discord.js";
import { Optionalize } from "../types/shared.js";

export function transformThreadMember(bot: Bot, payload: DiscordThreadMember) {
  const threadMember = {
    id: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    threadId: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
  };

  return threadMember as Optionalize<typeof threadMember>;
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate) {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  };

  return threadMember as Optionalize<typeof threadMember>;
}

export interface ThreadMember extends ReturnType<typeof transformThreadMember> {}
export interface ThreadMemberGuildCreate extends ReturnType<typeof transformThreadMemberGuildCreate> {}
