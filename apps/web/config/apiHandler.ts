import Axios from 'axios';

export const buzzNetAPI = Axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
