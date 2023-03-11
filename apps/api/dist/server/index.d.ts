import { Application } from 'express';
import { PrismaClient } from '@prisma/client';
export declare const server: Application;
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client").Prisma.RejectOnNotFound | import("@prisma/client").Prisma.RejectPerOperation | undefined>;
