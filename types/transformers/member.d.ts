import type { Bot } from "../bot.js";
import { DiscordMember, DiscordUser } from "../types/discord.js";
import { MemberToggles } from "./toggles/member.js";
import { UserToggles } from "./toggles/user.js";
export declare function transformUser(bot: Bot, payload: DiscordUser): {
    avatar?: bigint | undefined;
    locale?: string | undefined;
    flags?: import("../types/shared.js").UserFlags | undefined;
    email?: string | undefined;
    premiumType?: import("../types/shared.js").PremiumTypes | undefined;
    publicFlags?: import("../types/shared.js").UserFlags | undefined;
    id: bigint;
    discriminator: string;
    username: string;
    toggles: UserToggles;
};
export declare function transformMember(bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint): {
    avatar?: bigint | undefined;
    permissions?: bigint | undefined;
    nick?: string | undefined;
    premiumSince?: number | undefined;
    communicationDisabledUntil?: number | undefined;
    id: bigint;
    guildId: bigint;
    roles: bigint[];
    toggles: MemberToggles;
    joinedAt: number;
};
export interface Member extends ReturnType<typeof transformMember> {
}
export interface User extends ReturnType<typeof transformUser> {
}
