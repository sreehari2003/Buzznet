import { Router } from 'express';
// eslint-disable-next-line import/no-cycle
import { createUser, isUserNameExist, userLogin } from '../controller/user.controller';

export const userRouter: Router = Router();

userRouter.post('/signup', createUser);
userRouter.post('./login', userLogin);
userRouter.post('/username', isUserNameExist);
