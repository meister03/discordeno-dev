"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCachePlugin = void 0;
require("../../_dnt.polyfills.js");
const deps_js_1 = require("./deps.js");
const setupCacheRemovals_js_1 = require("./src/setupCacheRemovals.js");
const addCacheCollections_js_1 = require("./src/addCacheCollections.js");
const setupCacheEdits_js_1 = require("./src/setupCacheEdits.js");
// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
function enableCachePlugin(rawBot) {
    // MARK THIS PLUGIN BEING USED
    rawBot.enabledPlugins.add("CACHE");
    // CUSTOMIZATION GOES HERE
    const bot = (0, addCacheCollections_js_1.addCacheCollections)(rawBot);
    // Get the unmodified transformer.
    const { guild, user, member, channel, message, presence, role } = bot.transformers;
    // Override the transformer
    bot.transformers.guild = function (_, payload) {
        // Run the unmodified transformer
        const result = guild(bot, payload);
        // Cache the result
        if (result) {
            bot.guilds.set(result.id, result);
            const channels = payload.guild.channels || [];
            channels.forEach((channel) => {
                bot.transformers.channel(bot, { channel, guildId: result.id });
            });
        }
        // Return the result
        return result;
    };
    // Override the transformer
    bot.transformers.user = function (...args) {
        // Run the unmodified transformer
        const result = user(...args);
        // Cache the result
        if (result) {
            bot.users.set(result.id, result);
        }
        // Return the result
        return result;
    };
    // Override the transformer
    bot.transformers.member = function (...args) {
        // Run the unmodified transformer
        const result = member(...args);
        // Cache the result
        if (result) {
            bot.members.set(bot.transformers.snowflake(`${result.id}${result.guildId}`), result);
        }
        // Return the result
        return result;
    };
    // Override the transformer
    bot.transformers.channel = function (...args) {
        // Run the unmodified transformer
        const result = channel(...args);
        // Cache the result
        if (result) {
            bot.channels.set(result.id, result);
        }
        // Return the result
        return result;
    };
    // Override the transformer
    bot.transformers.message = function (_, payload) {
        // Run the unmodified transformer
        const result = message(bot, payload);
        // Cache the result
        if (result) {
            bot.messages.set(result.id, result);
            // CACHE THE USER
            const user = bot.transformers.user(bot, payload.author);
            bot.users.set(user.id, user);
            if (payload.guild_id && payload.member) {
                const guildId = bot.transformers.snowflake(payload.guild_id);
                // CACHE THE MEMBER
                bot.members.set(bot.transformers.snowflake(`${payload.author.id}${payload.guild_id}`), bot.transformers.member(bot, payload.member, guildId, user.id));
            }
        }
        // Return the result
        return result;
    };
    // Override the transformer
    bot.transformers.presence = function (...args) {
        // Run the unmodified transformer
        const result = presence(...args);
        // Cache the result
        if (result) {
            bot.presences.set(result.user.id, result);
        }
        // Return the result
        return result;
    };
    // Override the transformer
    bot.transformers.role = function (...args) {
        // Run the unmodified transformer
        const result = role(...args);
        // Cache the result
        if (result) {
            bot.guilds.get(result.guildId)?.roles.set(result.id, result);
        }
        // Return the result
        return result;
    };
    const { GUILD_EMOJIS_UPDATE } = bot.handlers;
    bot.handlers.GUILD_EMOJIS_UPDATE = function (_, data, shardId) {
        const payload = data.d;
        const guild = bot.guilds.get(bot.transformers.snowflake(payload.guild_id));
        if (guild) {
            guild.emojis = new deps_js_1.Collection(payload.emojis.map((e) => {
                const emoji = bot.transformers.emoji(bot, e);
                return [emoji.id, emoji];
            }));
        }
        GUILD_EMOJIS_UPDATE(bot, data, shardId);
    };
    (0, setupCacheRemovals_js_1.setupCacheRemovals)(bot);
    (0, setupCacheEdits_js_1.setupCacheEdits)(bot);
    // PLUGINS MUST RETURN THE BOT
    return bot;
}
exports.enableCachePlugin = enableCachePlugin;
exports.default = enableCachePlugin;
__exportStar(require("./src/addCacheCollections.js"), exports);
__exportStar(require("./src/dispatchRequirements.js"), exports);
__exportStar(require("./src/setupCacheEdits.js"), exports);
__exportStar(require("./src/setupCacheRemovals.js"), exports);
__exportStar(require("./src/sweepers.js"), exports);
