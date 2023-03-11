import { Request, Response, NextFunction } from 'express';
export declare const wrapAsync: (fun: any) => (req: Request, res: Response, next: NextFunction) => void;
