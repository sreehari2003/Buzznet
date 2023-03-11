"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = void 0;
const wrapAsync = (fun) => function (req, res, next) {
    fun(req, res, next).catch(next);
};
exports.wrapAsync = wrapAsync;
