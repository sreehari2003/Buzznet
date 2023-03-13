import { Router } from 'express';
// eslint-disable-next-line import/no-cycle
import {
    createUser,
    isUserNameExist,
    userLogin,
    clearDB,
    verifyUser,
} from '../controller/user.controller';
import { isAuth } from '../server/middleware/isAuth';

export const userRouter: Router = Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', userLogin);
userRouter.get('/user', isUserNameExist);
userRouter.get('/reset', clearDB);
userRouter.get('/me', isAuth, verifyUser);
