import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
    serverResponse,
    wrapAsync,
    AppError,
    hashJwt,
    hashPassword,
    verifyPassword,
} from '../utils';
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
        return res.status(201).json(serverResponse(`Welcome back ${existUser.name}`, existUser));
    },
);

// this function runs on create prolfile page to check to find unique username
export const isUserNameExist: RequestHandler = wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body;
        if (!username) {
            return next(new AppError('please provide a user name', 404));
        }
        const data = await prisma.user.findUnique({
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
    },
);
