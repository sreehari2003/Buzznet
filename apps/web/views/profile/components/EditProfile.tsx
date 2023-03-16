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
import { UpdateProfile } from '@app/views/validator';
import { buzzNetAPI } from '@app/config';
import { useRouter } from 'next/router';
import { useAuth } from '@app/hooks';
import { useEffect } from 'react';

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

export type ProfileForm = InferType<typeof UpdateProfile>;

export const EditProfile = ({ isOpen, onClose }: Prop) => {
    const { setUser, user } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProfileForm>({
        mode: 'onSubmit',
        resolver: yupResolver(UpdateProfile),
        defaultValues: {
            ...user,
        },
    });

    // changing form values wheneever  from data changes
    useEffect(() => {
        reset({
            ...user,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const toast = useToast();
    const router = useRouter();

    const backToDefault = () => {
        onClose();
        reset();
    };

    const handleFormData: SubmitHandler<ProfileForm> = async (data) => {
        try {
            const { data: res } = await buzzNetAPI.patch('/user', data);
            if (!res.ok) {
                throw new Error(res.message);
            }
            toast({
                title: 'account was updated succesfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            setUser(res.data);
            router.push(`/${res.data.username}`);
        } catch {
            toast({
                title: 'Couldnt update your account info.',
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
                            Update your account
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
                            <FormErrorMessage>name should not be empty</FormErrorMessage>
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
                            onClick={backToDefault}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="blue" w="40%" type="submit">
                            Update
                        </Button>
                    </Flex>
                </form>
            </ModalContent>
        </Modal>
    );
};
