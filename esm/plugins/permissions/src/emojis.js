import { requireBotGuildPermissions } from "./permissions.js";
export function createEmoji(bot) {
    const createEmojiOld = bot.helpers.createEmoji;
    bot.helpers.createEmoji = async function (guildId, id) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);
        return await createEmojiOld(guildId, id);
    };
}
export function deleteEmoji(bot) {
    const deleteEmojiOld = bot.helpers.deleteEmoji;
    bot.helpers.deleteEmoji = async function (guildId, id) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);
        return await deleteEmojiOld(guildId, id);
    };
}
export function editEmoji(bot) {
    const editEmojiOld = bot.helpers.editEmoji;
    bot.helpers.editEmoji = async function (guildId, id, options) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);
        return await editEmojiOld(guildId, id, options);
    };
}
export default function setupEmojiPermChecks(bot) {
    createEmoji(bot);
    deleteEmoji(bot);
    editEmoji(bot);
}
