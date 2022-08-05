"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validDiscoveryTerm = void 0;
async function validDiscoveryTerm(bot, term) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.DISCOVERY_VALID_TERM(term));
    return result.valid;
}
exports.validDiscoveryTerm = validDiscoveryTerm;
