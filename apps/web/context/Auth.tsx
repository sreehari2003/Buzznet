import React, { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { buzzNetAPI } from '@app/config';
import { ProfileForm } from '@app/views/signup';
import Router, { useRouter } from 'next/router';

export interface AuthCtx {
    logOut: () => void;
    user: ProfileForm | null;
    isLoading: boolean;
    setUser: React.Dispatch<ProfileForm | null>;
    setLoading: React.Dispatch<boolean>;
}
export const AuthContext = React.createContext<AuthCtx>({
    logOut: () => {},
    user: null,
    isLoading: false,
    setUser: () => {},
    setLoading: () => {},
});

interface Child {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Child) => {
    const router = useRouter();
    const [user, setUser] = useState<ProfileForm | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    // listening for route change events
    Router.events.on('routeChangeStart', () => {
        // when route change loading screen popup
        setLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });

    useEffect(() => {
        async function loadUserFromCookies() {
            try {
                setLoading(true);
                const token = Cookies.get('jwtID');
                if (token) {
                    buzzNetAPI.defaults.headers.common.authorization = `Bearer ${token}`;
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    const { data } = await buzzNetAPI.get('/me');
                    if (!data.ok) {
                        throw new Error();
                    }
                    setUser(data?.data);
                    if (router.pathname === '/') {
                        router.push(`${data.data.username}`);
                    }
                }
            } catch {
                router.push('/');
            } finally {
                setLoading(false);
            }
        }
        loadUserFromCookies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const logOut = () => {
        setUser(null);
        Cookies.remove('jwtID');
        router.push('/');
        window.location.reload();
    };

    const contextValue = useMemo(
        () => ({
            logOut,
            user,
            isLoading,
            setUser,
            setLoading,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user],
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
