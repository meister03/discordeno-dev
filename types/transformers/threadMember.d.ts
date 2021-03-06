import { Bot } from "../bot.js";
import { DiscordThreadMember, DiscordThreadMemberGuildCreate } from "../types/discord.js";
export declare function transformThreadMember(bot: Bot, payload: DiscordThreadMember): {
    id?: bigint | undefined;
    threadId?: bigint | undefined;
    joinTimestamp: number;
};
export declare function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate): {
    joinTimestamp: number;
};
export interface ThreadMember extends ReturnType<typeof transformThreadMember> {
}
export interface ThreadMemberGuildCreate extends ReturnType<typeof transformThreadMemberGuildCreate> {
}
