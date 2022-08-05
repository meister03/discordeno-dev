import { Collection } from "../../util/collection.js";
import type { Bot } from "../../bot.js";
import { DiscordTemplate } from "../../types/discord.js";

/** Returns an array of templates. Requires the `MANAGE_GUILD` permission. */
export async function getGuildTemplates(bot: Bot, guildId: bigint) {
  const templates = await bot.rest.runMethod<DiscordTemplate[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_TEMPLATES(guildId),
  );

  return new Collection(templates.map((template) => [template.code, bot.transformers.template(bot, template)]));
}
