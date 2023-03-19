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
    acceptFriend,
    unFriend,
    getAllFreindRequest,
    mutualFriend,
} from '../controller/user.controller';
import { isAuth } from '../server/middleware/isAuth';

export const userRouter: Router = Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', userLogin);
userRouter.route('/user').get(isUserNameExist).patch(isAuth, updateUser);
userRouter.get('/reset', clearDB);
userRouter.get('/me', isAuth, verifyUser);
userRouter.post('/add', isAuth, addFriend);
userRouter.post('/accept', isAuth, acceptFriend);
userRouter.get('/friend', isAuth, getAllFreindRequest);
userRouter.post('/remove', isAuth, unFriend);
userRouter.get('/mutual', isAuth, mutualFriend);
