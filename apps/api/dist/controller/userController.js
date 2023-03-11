"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const utils_1 = require("../utils");
exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, image, UID } = req.body;
    if (!name || !email || !image || !UID) {
        return next(new AppError('Missing all the required inputs', 404));
    }
    let { username } = req.body;
    if (!username) {
        username = email;
    }
    const existUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existUser) {
        const token = hashJwt(existUser.UID);
        res.cookie('jwtID', token);
        res.status(201).json((0, utils_1.serverResponse)(`Welcome back ${existUser.name}`, existUser));
    }
});
