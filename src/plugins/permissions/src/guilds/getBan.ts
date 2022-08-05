import { BotWithCache } from "../../deps.js";
import { requireBotGuildPermissions } from "../permissions.js";

export default function getBan(bot: BotWithCache) {
  const getBanOld = bot.helpers.getBan;

  bot.helpers.getBan = async function (guildId, memberId) {
    requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

    return await getBanOld(guildId, memberId);
  };
}
