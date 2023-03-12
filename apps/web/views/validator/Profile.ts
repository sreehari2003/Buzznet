import * as Yup from 'yup';

export const Profile = Yup.object({
    name: Yup.string().required(),
    password: Yup.string().required(),
    username: Yup.string().required(),
    bio: Yup.string().required(),
    instagram: Yup.string().required(),
    twitter: Yup.string(),
    dob: Yup.date().required(),
});
