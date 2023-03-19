/* eslint-disable import/no-cycle */
import express, { Application, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
// import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { AppError } from '../utils';
import { userRouter } from '../router';

// loading env files
dotenv.config();
const server: Application = express();
// server.use(pino());

export const prisma = new PrismaClient();

async function main() {
    // Connect the client
    await prisma.$connect();
    // eslint-disable-next-line no-console
    console.log('Connected to Prisma and mongoDB');
}

main()
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('Error in connecting database');
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// global
server.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001', 'https://buzznet.vercel.app'],
        credentials: true,
    }),
);
server.use(express.json());
server.get('/', (req: Request, res: Response) => {
    res.status(201).json({
        ok: true,
        message: 'app is running successfully',
    });
});
server.use('/api/v1', userRouter);

server.all('*', (req: Request, _res: Response, next: NextFunction) => {
    next(new AppError(`The requested page ${req.originalUrl} was not found`, 404));
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // eslint-disable-next-line no-param-reassign
    err.statusCode = err.statusCode || 500;
    // eslint-disable-next-line no-param-reassign
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        ok: false,
        status: err.status,
        message: err.message,
    });
});

export default server;
