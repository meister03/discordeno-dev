import type { Bot } from "../../bot.js";
/** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
export declare function getVanityUrl(bot: Bot, guildId: bigint): Promise<{
    uses: number | undefined;
    code: string | undefined;
}>;
