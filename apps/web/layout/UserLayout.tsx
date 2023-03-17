import React from 'react';
import { Child } from '@app/types';
import { useAuth } from '@app/hooks';
import { UserTopbar } from './components/UserTopbar';
import { Loader } from './components/Loader';

export const UserLayout = ({ children }: Child): JSX.Element => {
    const { isLoading } = useAuth();

    if (isLoading) {
        <Loader />;
    }

    return (
        <>
            <UserTopbar />
            {children}
        </>
    );
};
