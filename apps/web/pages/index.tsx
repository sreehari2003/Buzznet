import React from 'react';
import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Image,
    Input,
    VStack,
    Button,
    Text,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { userLogin } from '@app/views/validator';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatUserModal } from '@app/views/signup';

type UserInput = Yup.InferType<typeof userLogin>;

const Index = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserInput>({
        mode: 'onSubmit',
        resolver: yupResolver(userLogin),
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const userSubmit: SubmitHandler<UserInput> = (data) => {
        console.log(data);
    };

    return (
        <Flex p="20px" pl="40px" h="100vh">
            <CreatUserModal isOpen={isOpen} onClose={onClose} />
            <Image src="side.jpg" borderRadius="lg" display={{ base: 'none', md: 'block' }} />
            <VStack w="100%">
                <Heading
                    textAlign="center"
                    fontSize={{ base: '60px', md: '100px' }}
                    bg="linear-gradient(179.2deg, rgb(21, 21, 212) 0.9%, rgb(53, 220, 243) 95.5%)"
                    bgClip="text"
                    mb="40px"
                    mt={{ base: '40px', md: 'none' }}
                >
                    Buzznet
                </Heading>
                <form onSubmit={handleSubmit(userSubmit)}>
                    <VStack
                        alignItems="center"
                        justifyContent="center"
                        w="400px"
                        spacing="20px"
                        borderRadius="20px"
                        p="5"
                        h="400px"
                        boxShadow="md"
                    >
                        <Heading fontSize="26px" mb="40px">
                            Login to your acccount
                        </Heading>
                        <FormControl isInvalid={!!errors.username}>
                            <FormLabel fontSize="14px">username</FormLabel>
                            <Input type="string" placeholder="elonmusk" {...register('username')} />
                            <FormErrorMessage>username should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.username}>
                            <FormLabel fontSize="14px">Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="random password"
                                {...register('password')}
                            />
                            <FormErrorMessage>password should not be empty</FormErrorMessage>
                        </FormControl>
                        <Button colorScheme="blue" w="100%" type="submit" isLoading={isSubmitting}>
                            Login
                        </Button>
                    </VStack>
                    <HStack justifyContent="space-between" p="4">
                        <Text>No Account yet ?</Text>
                        <Text
                            color="blue"
                            _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => onOpen()}
                        >
                            signup
                        </Text>
                    </HStack>
                </form>
            </VStack>
        </Flex>
    );
};

export default Index;
