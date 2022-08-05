import { BotWithCache } from "../../../deps.js";
import createForumPost from "./createForumPost.js";

export default function setupThreadPermChecks(bot: BotWithCache) {
  createForumPost(bot);
}
