import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildMembersChunk(bot: Bot, data: DiscordGatewayPayload): Promise<{
    guildId: bigint;
    members: import("../../mod.js").Member[];
    chunkIndex: number;
    chunkCount: number;
    notFound: bigint[] | undefined;
    presences: {
        user: import("../../mod.js").User;
        guildId: bigint;
        status: number;
        activities: import("../../mod.js").Activity[];
        clientStatus: {
            desktop: string | undefined;
            mobile: string | undefined;
            web: string | undefined;
        };
    }[] | undefined;
    nonce: string | undefined;
}>;
