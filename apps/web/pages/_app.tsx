import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Child } from '@app/types';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => (
    <ChakraProvider>
        {Component.Layout ? (
            <Component.Layout>
                <Component {...pageProps} />
            </Component.Layout>
        ) : (
            <Component {...pageProps} />
        )}
    </ChakraProvider>
);
export default MyApp;
