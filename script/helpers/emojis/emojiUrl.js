"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiUrl = void 0;
/** Creates a url to the emoji from the Discord CDN. */
function emojiUrl(bot, id, animated = false) {
    return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
}
exports.emojiUrl = emojiUrl;
