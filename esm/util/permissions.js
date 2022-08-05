import { BitwisePermissionFlags } from "../types/shared.js";
/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits) {
    return Object.keys(BitwisePermissionFlags).filter((permission) => {
        // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
        if (Number(permission))
            return false;
        // Check if permissionBits has this permission
        return permissionBits & BigInt(BitwisePermissionFlags[permission]);
    });
}
/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions) {
    return permissions
        .reduce((bits, perm) => {
        bits |= BigInt(BitwisePermissionFlags[perm]);
        return bits;
    }, 0n)
        .toString();
}
