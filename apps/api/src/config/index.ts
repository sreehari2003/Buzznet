import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    CLINETID: process.env.CLINETID,
    CLINETSECRET: process.env.CLINETSECRET,
    JWT_SECRET: process.env.JWT_SECRET as string,
};
