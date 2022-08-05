import type { Bot } from "../../bot.js";
/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export declare function getInvite(bot: Bot, inviteCode: string, options?: GetInvite): Promise<{
    code: string;
    guildId: bigint | undefined;
    channelId: bigint | undefined;
    inviter: import("../../mod.js").User | undefined;
    targetType: import("../../mod.js").TargetTypes | undefined;
    targetUser: import("../../mod.js").User | undefined;
    targetApplicationId: bigint | undefined;
    approximatePresenceCount: number | undefined;
    approximateMemberCount: number | undefined;
    expiresAt: number | undefined;
}>;
/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
    /** Whether the invite should contain approximate member counts */
    withCounts?: boolean;
    /** Whether the invite should contain the expiration date */
    withExpiration?: boolean;
    /** the guild scheduled event to include with the invite */
    scheduledEventId?: bigint;
}
