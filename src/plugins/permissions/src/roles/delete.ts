import { BotWithCache } from "../../deps.js";
import { requireBotGuildPermissions } from "../permissions.js";

export default function deleteRole(bot: BotWithCache) {
  const deleteRoleOld = bot.helpers.deleteRole;

  bot.helpers.deleteRole = async function (
    guildId,
    id,
  ) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

    return await deleteRoleOld(guildId, id);
  };
}
