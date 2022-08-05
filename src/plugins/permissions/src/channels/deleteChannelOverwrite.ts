import { BotWithCache } from "../../deps.js";
import { requireBotChannelPermissions } from "../permissions.js";

export default function deleteChannelOverwrite(bot: BotWithCache) {
  const deleteChannelOverwriteOld = bot.helpers.deleteChannelOverwrite;

  bot.helpers.deleteChannelOverwrite = async function (channelId, overwriteId) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
    }

    return await deleteChannelOverwriteOld(channelId, overwriteId);
  };
}
