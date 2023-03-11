"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserNameExist = exports.createUser = void 0;
const utils_1 = require("../utils");
const server_1 = require("../server");
exports.createUser = (0, utils_1.wrapAsync)(async (req, res, next) => {
    const { name, password, bio, dob, username } = req.body;
    if (!name || !password || !bio || !username || !dob) {
        return next(new utils_1.AppError('Missing all the required inputs', 404));
    }
    const existUser = await server_1.prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (existUser) {
        const token = (0, utils_1.hashJwt)(existUser.id);
        res.cookie('jwtID', token);
        return res
            .status(201)
            .json((0, utils_1.serverResponse)(`Welcome back ${existUser.name}`, existUser));
    }
    const newUser = await server_1.prisma.user.create({
        data: Object.assign({}, req.body),
    });
    return res.status(201).json((0, utils_1.serverResponse)(`Your Account was created`, newUser));
});
exports.isUserNameExist = (0, utils_1.wrapAsync)(async (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return next(new utils_1.AppError('please provide a user name', 404));
    }
    const data = await server_1.prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (data) {
        return res.status(201).json({
            isExist: true,
        });
    }
    return res.status(201).json({
        isExist: false,
    });
});
