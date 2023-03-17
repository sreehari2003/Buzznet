import React from 'react';
import { Child } from '@app/types';
import { Heading, HStack, Link } from '@chakra-ui/react';
import { useAuth } from '@app/hooks';
import { Loader } from './components/Loader';

export const MainLayout = ({ children }: Child) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <HStack px="10" py="3">
                <Link href="/">
                    <Heading
                        textAlign="center"
                        fontSize="30px"
                        bg="linear-gradient(179.2deg, rgb(21, 21, 212) 0.9%, rgb(53, 220, 243) 95.5%)"
                        bgClip="text"
                    >
                        Buzznet
                    </Heading>
                </Link>
            </HStack>
            {children}
        </>
    );
};
