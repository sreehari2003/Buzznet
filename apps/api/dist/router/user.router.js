"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/user', user_controller_1.createUser);
exports.userRouter.post('/username', user_controller_1.isUserNameExist);
