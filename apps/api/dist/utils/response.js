"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverResponse = void 0;
const serverResponse = (message, data) => ({
    ok: true,
    message,
    data,
});
exports.serverResponse = serverResponse;
