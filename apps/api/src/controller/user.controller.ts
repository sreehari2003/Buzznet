import { Request, Response, NextFunction, RequestHandler, User } from 'express';
import {
    serverResponse,
    wrapAsync,
    AppError,
    hashJwt,
    hashPassword,
    verifyPassword,
} from '../utils';
import { ENV } from '../config';
// eslint-disable-next-line import/no-cycle
import { prisma } from '../server';

// Function to create user
export const createUser: RequestHandler = wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, password, bio, dob, username } = req.body;
        if (!name || !password || !bio || !username || !dob) {
            return next(new AppError('Missing all the required inputs', 404));
        }
        const existUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existUser) {
            return next(new AppError('username already taken', 404));
        }

        const hashed = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                ...req.body,
                password: hashed,
            },
        });
        const token = hashJwt(newUser.id);
        res.cookie('jwtID', token);
        newUser.password = '';
        return res.status(201).json(serverResponse(`Your Account was created`, newUser));
    },
);

export const userLogin: RequestHandler = wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { password, username } = req.body;

        const existUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!existUser) {
            return next(new AppError('Inavlid username', 404));
        }
        // check if user exists
        const isPasssCorrect = await verifyPassword(password, existUser.password);
        if (!isPasssCorrect) {
            return next(new AppError('Inavlid username or password', 404));
        }

        const token = hashJwt(existUser.id);
        res.cookie('jwtID', token);
        existUser.password = '';
        return res.status(201).json(serverResponse(`Welcome back ${existUser.name}`, existUser));
    },
);

type Query = {
    username: string;
};

// this function runs on create prolfile page to check to find unique username
export const isUserNameExist: RequestHandler = wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.query as Query;
        if (!username) {
            return next(new AppError('please provide a user name', 404));
        }
        const data = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!data) {
            return next(new AppError('user dont exist', 404));
        }
        data.password = '';
        return res.status(201).json(serverResponse(`User found`, data));
    },
);

export const clearDB: RequestHandler = wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { pass } = req.query;
        if (pass !== ENV.RESET) {
            return next(new AppError('Invalid admin password', 404));
        }
        await prisma.user.deleteMany();
        await prisma.friends.deleteMany();

        return res.status(201).json(serverResponse(`Db was cleared`, null));
    },
);

export const verifyUser: RequestHandler = wrapAsync(
    async (req: User, res: Response, next: NextFunction) => {
        if (req.user) {
            return res.status(201).json(serverResponse(`user verified successfully`, req.user));
        }
        return next(new AppError('Invalid userid', 404));
    },
);

export const updateUser: RequestHandler = wrapAsync(
    async (req: User, res: Response, next: NextFunction) => {
        const id = req?.user?.id;
        if (!req.user || id) {
            return next(new AppError('Invalid userid', 404));
        }

        const update = await prisma.user.update({
            where: {
                id: req.user?.id,
            },
            data: {
                ...req.body,
            },
        });

        return res.status(201).json(serverResponse(`user updatedsuccessfully`, update));
    },
);

export const addFriend: RequestHandler = wrapAsync(
    async (req: User, res: Response, next: NextFunction) => {
        const id = req?.user?.id;
        const { to } = req.body;
        if (!to) {
            return next(new AppError('Invalid friend request', 404));
        }
        const data = await prisma.user.update({
            where: {
                id,
            },
            data: {
                Friends: {
                    create: {
                        status: 'PENDING',
                        userName: to,
                        source: 'SEND',
                    },
                },
            },
        });

        await prisma.user.update({
            where: {
                username: to,
            },
            data: {
                Friends: {
                    create: {
                        status: 'PENDING',
                        userName: req.user.username,
                        source: 'RECIVED',
                    },
                },
            },
        });

        return res.status(201).json(serverResponse(`user updatedsuccessfully`, data));
    },
);
