import { BotWithCache } from "../../deps.js";
import createWebhook from "./createWebhook.js";
import deleteWebhook from "./deleteWebhook.js";
import editWebhook from "./editWebhook.js";
import setupMessageWebhookPermChecks from "./message.js";

export default function setupWebhooksPermChecks(bot: BotWithCache) {
  createWebhook(bot);
  deleteWebhook(bot);
  editWebhook(bot);
  setupMessageWebhookPermChecks(bot);
}
