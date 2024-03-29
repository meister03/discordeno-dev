import { Bot } from "../bot.js";
import { DiscordAttachment } from "../types/discord.js";
import { Optionalize } from "../types/shared.js";

export function transformAttachment(bot: Bot, payload: DiscordAttachment) {
  const attachment = {
    id: bot.transformers.snowflake(payload.id),
    filename: payload.filename,
    contentType: payload.content_type,
    size: payload.size,
    url: payload.url,
    proxyUrl: payload.proxy_url,
    height: payload.height ?? undefined,
    width: payload.width ?? undefined,
    ephemeral: payload.ephemeral,
  };

  return attachment as Optionalize<typeof attachment>;
}

export interface Attachment extends ReturnType<typeof transformAttachment> {}
