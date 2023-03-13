import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Child } from '@app/types';
import { theme } from '@app/theme';
import { AuthContextProvider } from '@app/context';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => (
    <ChakraProvider theme={theme}>
        <AuthContextProvider>
            {Component.Layout ? (
                <Component.Layout>
                    <Component {...pageProps} />
                </Component.Layout>
            ) : (
                <Component {...pageProps} />
            )}
        </AuthContextProvider>
    </ChakraProvider>
);
export default MyApp;
