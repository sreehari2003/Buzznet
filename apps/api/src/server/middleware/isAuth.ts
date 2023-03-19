/* eslint-disable import/no-cycle */
// This function is to check whether the user is authenticated or not

import { NextFunction, Response, RequestHandler, User } from 'express';
import jwt from 'jsonwebtoken';
import { wrapAsync, AppError } from '../../utils';
import { prisma } from '../index';
import { ENV } from '../../config';

interface JwtPayload {
    id: string;
}

export const isAuth: RequestHandler = wrapAsync(
    // eslint-disable-next-line consistent-return
    async (req: User, _res: Response, next: NextFunction) => {
        let token: string;
        if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            // eslint-disable-next-line prefer-destructuring
            token = req.cookies.jwtID || req.headers.authorization.split(' ')[1];
        } else {
            return next(new AppError('User not logged in', 401));
        }

        const { id } = jwt.verify(token, ENV.JWT_SECRET) as unknown as JwtPayload;

        if (!id) {
            return next(new AppError('Invalid user id, please login again', 401));
        }

        const extistingUser = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                Friends: true,
            },
        });

        if (!extistingUser) {
            return next(new AppError('Invalid user id, please login again', 401));
        }
        req.user = extistingUser;
        next();
    },
);
