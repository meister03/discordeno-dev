/** Creates a url to the emoji from the Discord CDN. */
export function emojiUrl(bot, id, animated = false) {
    return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
}
