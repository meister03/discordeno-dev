import { Bot } from "../bot.js";
import { DiscordPresenceUpdate } from "../types/discord.js";
import { UserToggles } from "./toggles/user.js";
export declare const statusTypes: Readonly<{
    online: number;
    dnd: number;
    idle: number;
    invisible: number;
    offline: number;
}>;
export declare function transformPresence(bot: Bot, payload: DiscordPresenceUpdate): {
    desktop?: string | undefined;
    mobile?: string | undefined;
    web?: string | undefined;
    status: number;
    user: {
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
    guildId: bigint;
    activities: import("./activity.js").Activity[];
};
export interface PresenceUpdate extends ReturnType<typeof transformPresence> {
}
export declare type StatusTypes = keyof typeof statusTypes;
