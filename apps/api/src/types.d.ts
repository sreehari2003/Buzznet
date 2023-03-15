import { Request } from 'express';

declare module 'express' {
    interface User extends Request {
        [x: string]: any;
        req: any;
        user: any;
    }
}
