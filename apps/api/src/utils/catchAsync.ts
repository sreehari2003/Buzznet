import { Request, Response, NextFunction } from 'express';

export const wrapAsync = (fun: any) =>
    // eslint-disable-next-line func-names
    function (req: Request, res: Response, next: NextFunction) {
        fun(req, res, next).catch(next);
    };
