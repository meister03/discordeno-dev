import { BotWithCache } from "../../deps.js";
import { higherRolePosition } from "../permissions.js";
import { highestRole, requireBotGuildPermissions } from "../permissions.js";

export default function removeRole(bot: BotWithCache) {
  const removeRoleOld = bot.helpers.removeRole;

  bot.helpers.removeRole = async function (
    guildId,
    memberId,
    roleId,
    reason,
  ) {
    const guild = bot.guilds.get(guildId);
    if (guild) {
      const role = guild.roles.get(roleId);
      if (role) {
        const botRole = highestRole(bot, guild, bot.id);

        if (!higherRolePosition(bot, guild, botRole.id, role.id)) {
          throw new Error(
            `The bot can not add this role to the member because it does not have a role higher than the role ID: ${role.id}.`,
          );
        }
      }

      requireBotGuildPermissions(bot, guild, ["MANAGE_ROLES"]);
    }

    return await removeRoleOld(guildId, memberId, roleId, reason);
  };
}
