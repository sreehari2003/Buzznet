import { useContext } from 'react';
import { AuthContext } from '@app/context';

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth === null) {
        throw new Error('unable to access the authContext, out of context reach');
    }
    return auth;
};
