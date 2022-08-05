import { BotWithCache } from "../../deps.js";
import { requireBotGuildPermissions } from "../permissions.js";

export default function getVanityUrl(bot: BotWithCache) {
  const getVanityUrlOld = bot.helpers.getVanityUrl;

  bot.helpers.getVanityUrl = async function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getVanityUrlOld(guildId);
  };
}
