"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils");
const index_1 = require("../index");
const config_1 = require("../../config");
exports.isAuth = (0, utils_1.wrapAsync)(async (req, _res, next) => {
    let token;
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new utils_1.AppError('User not logged in', 401));
    }
    const { id } = jsonwebtoken_1.default.verify(token, config_1.ENV.JWT_SECRET);
    if (id) {
        return next(new utils_1.AppError('Invalid user id, please login again', 401));
    }
    const extistingUser = await index_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (extistingUser) {
        return extistingUser;
    }
    return next(new utils_1.AppError('Invalid user id, please login again', 401));
});
