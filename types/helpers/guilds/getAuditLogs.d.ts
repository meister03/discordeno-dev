import type { Bot } from "../../bot.js";
import { AuditLogEvents } from "../../types/shared.js";
/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export declare function getAuditLogs(bot: Bot, guildId: bigint, options?: GetGuildAuditLog): Promise<{
    users: import("../../mod.js").User[];
    webhook: import("../../mod.js").Webhook[];
    auditLogEntries: import("../../mod.js").AuditLogEntry[];
    integrations: {
        id: bigint | undefined;
        name: string | undefined;
        type: "twitch" | "youtube" | "discord" | undefined;
        enabled: boolean | undefined;
        syncing: boolean | undefined;
        roleId: bigint | undefined;
        enableEmoticons: boolean | undefined;
        expireBehavior: import("../../types/shared.js").IntegrationExpireBehaviors | undefined;
        expireGracePeriod: number | undefined;
        user: import("../../mod.js").User | undefined;
        account: {
            id: bigint | undefined;
            name: string | undefined;
        };
        syncedAt: number | undefined;
        subscriberCount: number | undefined;
        revoked: boolean | undefined;
        application: {
            id: bigint;
            name: string;
            icon: bigint | undefined;
            description: string;
            bot: import("../../mod.js").User | undefined;
        } | undefined;
    }[];
    threads: import("../../mod.js").Channel[];
    scheduledEvents: import("../../mod.js").ScheduledEvent[] | undefined;
}>;
/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
    /** Entries from a specific user ID */
    userId?: bigint | string;
    /** Entries for a specific audit log event */
    actionType?: AuditLogEvents;
    /** Entries that preceded a specific audit log entry ID */
    before?: bigint | string;
    /** Maximum number of entries (between 1-100) to return, defaults to 50 */
    limit?: number;
}
