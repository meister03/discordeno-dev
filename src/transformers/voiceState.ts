import { Bot } from "../bot.js";
import { DiscordVoiceState } from "../types/discord.js";
import { VoiceStateToggles } from "./toggles/voice.js";
import { Optionalize } from "../types/shared.js";

export function transformVoiceState(bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }) {
  const voiceState = {
    toggles: new VoiceStateToggles(payload.voiceState),

    requestToSpeakTimestamp: payload.voiceState.request_to_speak_timestamp
      ? Date.parse(payload.voiceState.request_to_speak_timestamp)
      : undefined,
    sessionId: payload.voiceState.session_id,

    channelId: payload.voiceState.channel_id ? bot.transformers.snowflake(payload.voiceState.channel_id) : undefined,
    guildId: payload.guildId ||
      (payload.voiceState.guild_id ? bot.transformers.snowflake(payload.voiceState.guild_id) : 0n),
    userId: payload.voiceState.user_id ? bot.transformers.snowflake(payload.voiceState.user_id) : 0n,
  };

  return voiceState as Optionalize<typeof voiceState>;
}

export interface VoiceState extends ReturnType<typeof transformVoiceState> {}
