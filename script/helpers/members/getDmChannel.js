"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDmChannel = void 0;
/** Get a user's dm channel. This is required in order to send a DM. */
async function getDmChannel(bot, userId) {
    if (userId === bot.id)
        throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF);
    const dmChannelData = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.USER_DM(), {
        recipient_id: userId.toString(),
    });
    if (!dmChannelData?.id)
        return;
    return bot.transformers.channel(bot, { channel: dmChannelData });
}
exports.getDmChannel = getDmChannel;
