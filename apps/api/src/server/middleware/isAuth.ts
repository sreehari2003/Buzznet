// This function is to check whether the user is authenticated or not

import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { wrapAsync, AppError } from '../../utils';
import { prisma } from '../index';

interface JwtPayload {
    id: string;
}

export const isAuth = wrapAsync(async (req: Request, _res: Response, next: NextFunction) => {
    let token: string;
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // eslint-disable-next-line prefer-destructuring
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next(new AppError('User not logged in', 401));
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET) as unknown as JwtPayload;
    if (id) {
        return next(new AppError('Invalid user id, please login again', 401));
    }

    const extistingUser = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (extistingUser) {
        return extistingUser;
    }

    return next(new AppError('Invalid user id, please login again', 401));
});
