import { Router } from 'express';
// eslint-disable-next-line import/no-cycle
import {
    createUser,
    isUserNameExist,
    userLogin,
    clearDB,
    verifyUser,
    updateUser,
    addFriend,
} from '../controller/user.controller';
import { isAuth } from '../server/middleware/isAuth';

export const userRouter: Router = Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', userLogin);
userRouter.route('/user').get(isUserNameExist).patch(isAuth, updateUser);
userRouter.get('/reset', clearDB);
userRouter.get('/me', isAuth, verifyUser);
userRouter.post('/add', addFriend);
