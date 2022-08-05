"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEmoji = void 0;
const emoji_js_1 = require("./toggles/emoji.js");
function transformEmoji(bot, payload) {
    const emoji = {
        id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
        name: payload.name || undefined,
        roles: payload.roles?.map((id) => bot.transformers.snowflake(id)),
        user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
        toggles: new emoji_js_1.EmojiToggles(payload),
    };
    return emoji;
}
exports.transformEmoji = transformEmoji;
