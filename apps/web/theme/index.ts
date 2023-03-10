import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/inter/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
    fonts: {
        heading: `'Inter', sans-serif`,
    },
});
