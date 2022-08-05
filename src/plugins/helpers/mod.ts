import '../../_dnt.polyfills.js';
import {
  ApplicationCommandOptionChoice,
  Bot,
  Channel,
  Collection,
  CreateMessage,
  FinalHelpers,
  InteractionResponse,
  ListGuildMembers,
  Member,
  Message,
} from "./deps.js";
import { cloneChannel } from "./src/channels.js";
import { sendAutocompleteChoices } from "./src/sendAutoCompleteChoices.js";
import { sendDirectMessage } from "./src/sendDirectMessage.js";
import { suppressEmbeds } from "./src/suppressEmbeds.js";
import { archiveThread, editThread, lockThread, ModifyThread, unarchiveThread, unlockThread } from "./src/threads.js";
import { disconnectMember } from "./src/disconnectMember.js";
import { getMembersPaginated } from "./src/getMembersPaginated.js";
import { moveMember } from "./src/moveMember.js";
import { fetchAndRetrieveMembers } from "./src/fetchAndRetrieveMembers.js";
import { BotWithCache } from "../cache/src/addCacheCollections.js";
import { sendTextMessage } from "./src/sendTextMessage.js";
import { sendPrivateInteractionResponse } from "./src/sendPrivateInteractionResponse.js";

export type BotWithHelpersPlugin<B extends Bot = Bot> = Omit<B, "helpers"> & HelperFunctionsFromHelperPlugin;

export interface HelperFunctionsFromHelperPlugin {
  helpers: FinalHelpers & {
    fetchAndRetrieveMembers: (
      guildId: bigint,
    ) => Promise<Collection<bigint, Member>>;
    sendDirectMessage: (
      userId: bigint,
      content: string | CreateMessage,
    ) => Promise<Message>;
    sendTextMessage: (
      channelId: bigint,
      content: string | CreateMessage,
    ) => Promise<Message>;
    sendPrivateInteractionResponse: (
      id: bigint,
      token: string,
      options: InteractionResponse,
    ) => Promise<Message | undefined>;
    suppressEmbeds: (
      channelId: bigint,
      messageId: bigint,
    ) => Promise<Message>;
    archiveThread: (threadId: bigint) => Promise<Channel>;
    unarchiveThread: (threadId: bigint) => Promise<Channel>;
    lockThread: (threadId: bigint) => Promise<Channel>;
    unlockThread: (threadId: bigint) => Promise<Channel>;
    editThread: (
      threadId: bigint,
      options: ModifyThread,
      reason?: string,
    ) => Promise<Channel>;
    cloneChannel: (
      channel: Channel,
      reason?: string,
    ) => Promise<Channel>;
    sendAutocompleteChoices: (
      interactionId: bigint,
      interactionToken: string,
      choices: ApplicationCommandOptionChoice[],
    ) => Promise<void>;
    disconnectMember: (
      guildId: bigint,
      memberId: bigint,
    ) => Promise<Member>;
    getMembersPaginated: (
      guildId: bigint,
      options: ListGuildMembers,
    ) => Promise<Collection<bigint, Member>>;
    moveMember: (
      guildId: bigint,
      memberId: bigint,
      channelId: bigint,
    ) => Promise<Member>;
  };
}

export function enableHelpersPlugin<B extends Bot = Bot>(rawBot: B): BotWithHelpersPlugin<B> {
  // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
  const bot = rawBot as unknown as BotWithHelpersPlugin;

  bot.helpers.fetchAndRetrieveMembers = (
    guildId: bigint,
  ) => fetchAndRetrieveMembers(bot as unknown as BotWithCache, guildId);
  bot.helpers.sendDirectMessage = (
    userId: bigint,
    content: string | CreateMessage,
  ) => sendDirectMessage(bot, userId, content);
  bot.helpers.sendTextMessage = (
    channelId: bigint,
    content: string | CreateMessage,
  ) => sendTextMessage(bot, channelId, content);
  bot.helpers.sendPrivateInteractionResponse = (
    id: bigint,
    token: string,
    options: InteractionResponse,
  ) => sendPrivateInteractionResponse(bot, id, token, options);
  bot.helpers.suppressEmbeds = (channelId: bigint, messageId: bigint) => suppressEmbeds(bot, channelId, messageId);
  bot.helpers.archiveThread = (threadId: bigint) => archiveThread(bot, threadId);
  bot.helpers.unarchiveThread = (threadId: bigint) => unarchiveThread(bot, threadId);
  bot.helpers.lockThread = (threadId: bigint) => lockThread(bot, threadId);
  bot.helpers.unlockThread = (threadId: bigint) => unlockThread(bot, threadId);
  bot.helpers.editThread = (
    threadId: bigint,
    options: ModifyThread,
    reason?: string,
  ) => editThread(bot, threadId, options, reason);
  bot.helpers.cloneChannel = (channel: Channel, reason?: string) => cloneChannel(bot, channel, reason);
  bot.helpers.sendAutocompleteChoices = (
    interactionId: bigint,
    interactionToken: string,
    choices: ApplicationCommandOptionChoice[],
  ) => sendAutocompleteChoices(bot, interactionId, interactionToken, choices);
  bot.helpers.disconnectMember = (guildId: bigint, memberId: bigint) => disconnectMember(bot, guildId, memberId);
  bot.helpers.getMembersPaginated = (
    guildId: bigint,
    options: ListGuildMembers,
  ) => getMembersPaginated(bot, guildId, options);
  bot.helpers.moveMember = (
    guildId: bigint,
    memberId: bigint,
    channelId: bigint,
  ) => moveMember(bot, guildId, memberId, channelId);

  return bot as BotWithHelpersPlugin<B>;
}

// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/channels.js";
export * from "./src/disconnectMember.js";
export * from "./src/fetchAndRetrieveMembers.js";
export * from "./src/getMembersPaginated.js";
export * from "./src/moveMember.js";
export * from "./src/sendAutoCompleteChoices.js";
export * from "./src/sendDirectMessage.js";
export * from "./src/sendPrivateInteractionResponse.js";
export * from "./src/sendTextMessage.js";
export * from "./src/suppressEmbeds.js";
export * from "./src/threads.js";
export default enableHelpersPlugin;
