import { Button, Center, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuth } from '@app/hooks';

const LottieAnim = () => {
    const { user } = useAuth();
    const path = user?.username ? user.username : '';
    return (
        <Center h="100vh" flexDir="column">
            <Heading color="blue" fontSize="100px">
                404{' '}
            </Heading>
            <Heading color="blue" fontSize="30px">
                user not found
            </Heading>
            <Link href={`/${path}`}>
                <Button colorScheme="blue" variant="outline" mt="30px">
                    Home
                </Button>
            </Link>
        </Center>
    );
};

export default LottieAnim;
