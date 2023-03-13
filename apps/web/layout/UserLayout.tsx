import React from 'react';
import { Child } from '@app/types';
import { UserTopbar } from './components/UserTopbar';

export const UserLayout = ({ children }: Child) => {
    <>
        <UserTopbar />
        {children}
    </>;
};
