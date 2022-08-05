import { BotWithCache } from "../../deps.js";
import { requireBotGuildPermissions } from "../permissions.js";

export default function pruneMembers(bot: BotWithCache) {
  const pruneMembersOld = bot.helpers.pruneMembers;

  bot.helpers.pruneMembers = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);

    return await pruneMembersOld(guildId, options);
  };
}
