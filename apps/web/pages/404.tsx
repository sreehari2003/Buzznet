import { Button, Center, Heading } from '@chakra-ui/react';

const LottieAnim = () => (
    <Center h="100vh" flexDir="column">
        <Heading color="blue" fontSize="100px">
            404{' '}
        </Heading>
        <Heading color="blue" fontSize="30px">
            user not found
        </Heading>
        <Button colorScheme="blue" variant="outline" mt="30px">
            Home
        </Button>
    </Center>
);

export default LottieAnim;
