import Axios from 'axios';
import Cookies from 'js-cookie';

export const buzzNetAPI = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

buzzNetAPI.defaults.headers.common.authorization = `Bearer ${Cookies.get('jwtID')}`;
