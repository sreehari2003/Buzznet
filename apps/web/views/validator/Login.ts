import * as Yup from 'yup';

export const userLogin = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
});
