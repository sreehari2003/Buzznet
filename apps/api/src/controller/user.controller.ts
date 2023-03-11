import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverResponse, wrapAsync, AppError, hashJwt } from '../utils';
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
        // check if user exists
        if (existUser) {
            const token = hashJwt(existUser.id);
            res.cookie('jwtID', token);
            return res
                .status(201)
                .json(serverResponse(`Welcome back ${existUser.name}`, existUser));
        }

        const newUser = await prisma.user.create({
            data: {
                ...req.body,
            },
        });

        return res.status(201).json(serverResponse(`Your Account was created`, newUser));
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
