import { Router } from 'express';
import { createUser, isUserNameExist } from '../controller/user.controller';

export const userRouter: Router = Router();

userRouter.post('/user', createUser);
userRouter.post('/username', isUserNameExist);
