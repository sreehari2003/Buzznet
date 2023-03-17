import Lottie from 'react-lottie';
import { Center } from '@chakra-ui/react';
import Loaders from '../../public/loader.json';

export const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loaders,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Center h="100vh">
            <Lottie options={defaultOptions} height={300} width={300} />
        </Center>
    );
};
