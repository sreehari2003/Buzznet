import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Flex,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Profile } from '@app/views/validator';
import { buzzNetAPI } from '@app/config';
import { useRouter } from 'next/router';
import { useAuth } from '@app/hooks';

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

export type ProfileForm = InferType<typeof Profile>;

export const CreatUserModal = ({ isOpen, onClose }: Prop) => {
    const { setUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProfileForm>({
        mode: 'onSubmit',
        resolver: yupResolver(Profile),
    });
    const toast = useToast();
    const router = useRouter();

    const handleFormData: SubmitHandler<ProfileForm> = async (data) => {
        try {
            const { data: res } = await buzzNetAPI.post('/signup', data);
            if (!res.ok) {
                throw new Error(res.message);
            }
            toast({
                title: 'account created succesfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            setUser(res.data);
            router.push(`/${res.data.username}`);
        } catch {
            toast({
                title: 'Couldnt create your account.',
                description: 'user name already exists',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            onClose();
            reset();
        }
    };

    return (
        <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="outside">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
                <form onSubmit={handleSubmit(handleFormData)}>
                    <ModalHeader>
                        <Heading as="h2" fontSize="30px">
                            Create a New Account
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody rowGap="30px" display="flex" flexDir="column">
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel fontSize="14px">Your name</FormLabel>
                            <Input
                                type="string"
                                placeholder="sreehari jayaraj"
                                {...register('name')}
                            />
                            <FormErrorMessage>title should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.username}>
                            <FormLabel fontSize="14px">Your username</FormLabel>
                            <Input
                                type="string"
                                placeholder="stevejobs"
                                {...register('username')}
                            />
                            <FormHelperText>buzznet/{watch('username')}</FormHelperText>
                            <FormErrorMessage>username should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel fontSize="14px">Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="*******"
                                {...register('password')}
                            />
                            <FormErrorMessage>password should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.dob}>
                            <FormLabel fontSize="14px">Your birthday</FormLabel>
                            <Input type="date" {...register('dob')} />
                            <FormErrorMessage>date should not be empty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.bio}>
                            <FormLabel fontSize="14px">Your buzznet bio</FormLabel>
                            <Textarea
                                placeholder="Tell us something about you"
                                {...register('bio')}
                            />
                            <FormErrorMessage>bio should not be empty</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.instagram}>
                            <FormLabel fontSize="14px">Instagram</FormLabel>
                            <Input
                                type="string"
                                placeholder="mysite.com"
                                {...register('instagram')}
                            />
                            <FormErrorMessage>url should not be empmty</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.twitter}>
                            <FormLabel fontSize="14px">Twitter</FormLabel>
                            <Input type="string" placeholder="elonmusk" {...register('twitter')} />
                            <FormErrorMessage>url should not be empty</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <Flex justifyContent="space-around" mt="20px" mb="20px">
                        <Button
                            colorScheme="blue"
                            w="40%"
                            variant="outline"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="blue" w="40%" type="submit">
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </ModalContent>
        </Modal>
    );
};
