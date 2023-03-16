import Axios from 'axios';
import Cookies from 'js-cookie';

export const buzzNetAPI = Axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

buzzNetAPI.defaults.headers.common.authorization = `Bearer ${Cookies.get('jwtID')}`;
