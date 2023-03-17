import Lottie from 'react-lottie';

export const Loader = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: '/loader.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return <Lottie options={defaultOptions} height={400} width={400} />;
};
