"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelOverwriteHasPermission = exports.isHigherPosition = exports.higherRolePosition = exports.highestRole = exports.requireOverwritePermissions = exports.calculateBits = exports.calculatePermissions = exports.requireBotChannelPermissions = exports.requireChannelPermissions = exports.requireBotGuildPermissions = exports.requireGuildPermissions = exports.getMissingChannelPermissions = exports.getMissingGuildPermissions = exports.missingPermissions = exports.botHasChannelPermissions = exports.hasChannelPermissions = exports.botHasGuildPermissions = exports.hasGuildPermissions = exports.validatePermissions = exports.calculateChannelOverwrites = exports.calculateBasePermissions = void 0;
const deps_js_1 = require("../deps.js");
/** Calculates the permissions this member has in the given guild */
function calculateBasePermissions(bot, guildOrId, memberOrId) {
    const guild = typeof guildOrId === "bigint" ? bot.guilds.get(guildOrId) : guildOrId;
    const member = typeof memberOrId === "bigint" ? bot.members.get(memberOrId) : memberOrId;
    if (!guild || !member)
        return 8n;
    let permissions = 0n;
    // Calculate the role permissions bits, @everyone role is not in memberRoleIds so we need to pass guildId manually
    permissions |= [...member.roles, guild.id]
        .map((id) => guild.roles.get(id)?.permissions)
        // Removes any edge case undefined
        .filter((perm) => perm)
        .reduce((bits, perms) => {
        bits |= perms;
        return bits;
    }, 0n) || 0n;
    // If the memberId is equal to the guild ownerId he automatically has every permission so we add ADMINISTRATOR permission
    if (guild.ownerId === member.id)
        permissions |= 8n;
    // Return the members permission bits as a string
    return permissions;
}
exports.calculateBasePermissions = calculateBasePermissions;
/** Calculates the permissions this member has for the given Channel */
function calculateChannelOverwrites(bot, channelOrId, memberOrId) {
    const channel = typeof channelOrId === "bigint" ? bot.channels.get(channelOrId) : channelOrId;
    // This is a DM channel so return ADMINISTRATOR permission
    if (!channel?.guildId)
        return 8n;
    const member = typeof memberOrId === "bigint" ? bot.members.get(memberOrId) : memberOrId;
    if (!channel || !member)
        return 8n;
    // Get all the role permissions this member already has
    let permissions = calculateBasePermissions(bot, channel.guildId, member);
    // First calculate @everyone overwrites since these have the lowest priority
    const overwriteEveryone = channel.permissionOverwrites?.find((overwrite) => {
        const [_, id] = (0, deps_js_1.separateOverwrites)(overwrite);
        return id === channel.guildId;
    });
    if (overwriteEveryone) {
        const [_type, _id, allow, deny] = (0, deps_js_1.separateOverwrites)(overwriteEveryone);
        // First remove denied permissions since denied < allowed
        permissions &= ~deny;
        permissions |= allow;
    }
    const overwrites = channel.permissionOverwrites;
    // In order to calculate the role permissions correctly we need to temporarily save the allowed and denied permissions
    let allow = 0n;
    let deny = 0n;
    const memberRoles = member.roles || [];
    // Second calculate members role overwrites since these have middle priority
    for (const overwrite of overwrites || []) {
        const [_type, id, allowBits, denyBits] = (0, deps_js_1.separateOverwrites)(overwrite);
        if (!memberRoles.includes(id))
            continue;
        deny |= denyBits;
        allow |= allowBits;
    }
    // After role overwrite calculate save allowed permissions first we remove denied permissions since "denied < allowed"
    permissions &= ~deny;
    permissions |= allow;
    // Third calculate member specific overwrites since these have the highest priority
    const overwriteMember = overwrites?.find((overwrite) => {
        const [_, id] = (0, deps_js_1.separateOverwrites)(overwrite);
        return id === member.id;
    });
    if (overwriteMember) {
        const [_type, _id, allowBits, denyBits] = (0, deps_js_1.separateOverwrites)(overwriteMember);
        permissions &= ~denyBits;
        permissions |= allowBits;
    }
    return permissions;
}
exports.calculateChannelOverwrites = calculateChannelOverwrites;
/** Checks if the given permission bits are matching the given permissions. `ADMINISTRATOR` always returns `true` */
function validatePermissions(permissionBits, permissions) {
    if (permissionBits & 8n)
        return true;
    return permissions.every((permission) => 
    // Check if permission is in permissionBits
    permissionBits & BigInt(deps_js_1.BitwisePermissionFlags[permission]));
}
exports.validatePermissions = validatePermissions;
/** Checks if the given member has these permissions in the given guild */
function hasGuildPermissions(bot, guild, member, permissions) {
    // First we need the role permission bits this member has
    const basePermissions = calculateBasePermissions(bot, guild, member);
    // Second use the validatePermissions function to check if the member has every permission
    return validatePermissions(basePermissions, permissions);
}
exports.hasGuildPermissions = hasGuildPermissions;
/** Checks if the bot has these permissions in the given guild */
function botHasGuildPermissions(bot, guild, permissions) {
    // Since Bot is a normal member we can use the hasRolePermissions() function
    return hasGuildPermissions(bot, guild, bot.id, permissions);
}
exports.botHasGuildPermissions = botHasGuildPermissions;
/** Checks if the given member has these permissions for the given channel */
function hasChannelPermissions(bot, channel, member, permissions) {
    // First we need the overwrite bits this member has
    const channelOverwrites = calculateChannelOverwrites(bot, channel, member);
    // Second use the validatePermissions function to check if the member has every permission
    return validatePermissions(channelOverwrites, permissions);
}
exports.hasChannelPermissions = hasChannelPermissions;
/** Checks if the bot has these permissions f0r the given channel */
function botHasChannelPermissions(bot, channel, permissions) {
    // Since Bot is a normal member we can use the hasRolePermissions() function
    return hasChannelPermissions(bot, channel, bot.id, permissions);
}
exports.botHasChannelPermissions = botHasChannelPermissions;
/** Returns the permissions that are not in the given permissionBits */
function missingPermissions(permissionBits, permissions) {
    if (permissionBits & 8n)
        return [];
    return permissions.filter((permission) => !(permissionBits & BigInt(deps_js_1.BitwisePermissionFlags[permission])));
}
exports.missingPermissions = missingPermissions;
/** Get the missing Guild permissions this member has */
function getMissingGuildPermissions(bot, guild, member, permissions) {
    // First we need the role permission bits this member has
    const permissionBits = calculateBasePermissions(bot, guild, member);
    // Second return the members missing permissions
    return missingPermissions(permissionBits, permissions);
}
exports.getMissingGuildPermissions = getMissingGuildPermissions;
/** Get the missing Channel permissions this member has */
function getMissingChannelPermissions(bot, channel, member, permissions) {
    // First we need the role permission bits this member has
    const permissionBits = calculateChannelOverwrites(bot, channel, member);
    // Second return the members missing permissions
    return missingPermissions(permissionBits, permissions);
}
exports.getMissingChannelPermissions = getMissingChannelPermissions;
/** Throws an error if this member has not all of the given permissions */
function requireGuildPermissions(bot, guild, member, permissions) {
    const missing = getMissingGuildPermissions(bot, guild, member, permissions);
    if (missing.length) {
        // If the member is missing a permission throw an Error
        throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
    }
}
exports.requireGuildPermissions = requireGuildPermissions;
/** Throws an error if the bot does not have all permissions */
function requireBotGuildPermissions(bot, guild, permissions) {
    // Since Bot is a normal member we can use the throwOnMissingGuildPermission() function
    return requireGuildPermissions(bot, guild, bot.id, permissions);
}
exports.requireBotGuildPermissions = requireBotGuildPermissions;
/** Throws an error if this member has not all of the given permissions */
function requireChannelPermissions(bot, channel, member, permissions) {
    const missing = getMissingChannelPermissions(bot, channel, member, permissions);
    if (missing.length) {
        // If the member is missing a permission throw an Error
        throw new Error(`Missing Permissions: ${missing.join(" & ")}`);
    }
}
exports.requireChannelPermissions = requireChannelPermissions;
/** Throws an error if the bot has not all of the given channel permissions */
function requireBotChannelPermissions(bot, channel, permissions) {
    // Since Bot is a normal member we can use the throwOnMissingChannelPermission() function
    return requireChannelPermissions(bot, channel, bot.id, permissions);
}
exports.requireBotChannelPermissions = requireBotChannelPermissions;
/** This function converts a bitwise string to permission strings */
function calculatePermissions(permissionBits) {
    return Object.keys(deps_js_1.BitwisePermissionFlags).filter((permission) => {
        // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
        if (Number(permission))
            return false;
        // Check if permissionBits has this permission
        return permissionBits &
            BigInt(deps_js_1.BitwisePermissionFlags[permission]);
    });
}
exports.calculatePermissions = calculatePermissions;
/** This function converts an array of permissions into the bitwise string. */
function calculateBits(permissions) {
    return permissions
        .reduce((bits, perm) => {
        bits |= BigInt(deps_js_1.BitwisePermissionFlags[perm]);
        return bits;
    }, 0n)
        .toString();
}
exports.calculateBits = calculateBits;
/** Internal function to check if the bot has the permissions to set these overwrites */
function requireOverwritePermissions(bot, guildOrId, overwrites) {
    let requiredPerms = new Set(["MANAGE_CHANNELS"]);
    overwrites?.forEach((overwrite) => {
        if (overwrite.allow) {
            overwrite.allow.forEach(requiredPerms.add, requiredPerms);
        }
        if (overwrite.deny) {
            overwrite.deny.forEach(requiredPerms.add, requiredPerms);
        }
    });
    // MANAGE_ROLES permission can only be set by administrators
    if (requiredPerms.has("MANAGE_ROLES")) {
        requiredPerms = new Set(["ADMINISTRATOR"]);
    }
    requireGuildPermissions(bot, guildOrId, bot.id, [
        ...requiredPerms,
    ]);
}
exports.requireOverwritePermissions = requireOverwritePermissions;
/** Gets the highest role from the member in this guild */
function highestRole(bot, guildOrId, memberOrId) {
    const guild = typeof guildOrId === "bigint" ? bot.guilds.get(guildOrId) : guildOrId;
    if (!guild)
        throw new Error(deps_js_1.Errors.GUILD_NOT_FOUND);
    // Get the roles from the member
    const memberRoles = (typeof memberOrId === "bigint" ? bot.members.get(memberOrId) : memberOrId)
        ?.roles;
    // This member has no roles so the highest one is the @everyone role
    if (!memberRoles)
        return guild.roles.get(guild.id);
    let memberHighestRole;
    for (const roleId of memberRoles) {
        const role = guild.roles.get(roleId);
        // Rare edge case handling if undefined
        if (!role)
            continue;
        // If memberHighestRole is still undefined we want to assign the role,
        // else we want to check if the current role position is higher than the current memberHighestRole
        if (!memberHighestRole ||
            memberHighestRole.position < role.position ||
            memberHighestRole.position === role.position) {
            memberHighestRole = role;
        }
    }
    // The member has at least one role so memberHighestRole must exist
    return memberHighestRole;
}
exports.highestRole = highestRole;
/** Checks if the first role is higher than the second role */
function higherRolePosition(bot, guildOrId, roleId, otherRoleId) {
    const guild = typeof guildOrId === "bigint" ? bot.guilds.get(guildOrId) : guildOrId;
    if (!guild)
        return true;
    const role = guild.roles.get(roleId);
    const otherRole = guild.roles.get(otherRoleId);
    if (!role || !otherRole)
        throw new Error(deps_js_1.Errors.ROLE_NOT_FOUND);
    // Rare edge case handling
    if (role.position === otherRole.position) {
        return role.id < otherRole.id;
    }
    return role.position > otherRole.position;
}
exports.higherRolePosition = higherRolePosition;
/** Checks if the member has a higher position than the given role */
function isHigherPosition(bot, guildOrId, memberId, compareRoleId) {
    const guild = typeof guildOrId === "bigint" ? bot.guilds.get(guildOrId) : guildOrId;
    if (!guild || guild.ownerId === memberId)
        return true;
    const memberHighestRole = highestRole(bot, guild, memberId);
    return higherRolePosition(bot, guild.id, memberHighestRole.id, compareRoleId);
}
exports.isHigherPosition = isHigherPosition;
/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
function channelOverwriteHasPermission(guildId, id, overwrites, permissions) {
    const overwrite = overwrites.find((perm) => {
        const [_, bitID] = (0, deps_js_1.separateOverwrites)(perm);
        return id === bitID;
    }) ||
        overwrites.find((perm) => {
            const [_, bitID] = (0, deps_js_1.separateOverwrites)(perm);
            return bitID === guildId;
        });
    if (!overwrite)
        return false;
    return permissions.every((perm) => {
        const [_type, _id, allowBits, denyBits] = (0, deps_js_1.separateOverwrites)(overwrite);
        if (BigInt(denyBits) & BigInt(deps_js_1.BitwisePermissionFlags[perm])) {
            return false;
        }
        if (BigInt(allowBits) & BigInt(deps_js_1.BitwisePermissionFlags[perm])) {
            return true;
        }
    });
}
exports.channelOverwriteHasPermission = channelOverwriteHasPermission;
