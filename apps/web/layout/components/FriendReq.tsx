import {
    CircularProgress,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react';
import { AddFriendCard } from '@app/components/cards';
import { useEffect, useState } from 'react';
import { buzzNetAPI } from '@app/config';
import { useAuth } from '@app/hooks';

type Modals = {
    isOpen: boolean;
    onClose: () => void;
};

type Friend = {
    id: string;
    status: 'PENDING' | 'CONFIRMED';
    userName: string;
    source: 'SEND' | 'RECEIVED';
};

export const AddFriend = ({ isOpen, onClose }: Modals) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setUser, user } = useAuth();
    const [friend, setFriend] = useState<Friend[] | null>(null);

    const toast = useToast();
    useEffect(() => {
        // call api only when they open the modal
        if (isOpen) {
            (async () => {
                try {
                    setLoading(true);
                    const { data } = await buzzNetAPI.get('/friend');
                    if (!data.ok) {
                        throw new Error();
                    }

                    setFriend(data.data.Friends);
                } catch {
                    onClose();
                    toast({
                        title: 'Couldnt complete your request',
                        description: 'please try again later',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                } finally {
                    setLoading(false);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const acceptFriend = async (users: string) => {
        try {
            const { data } = await buzzNetAPI.post('/accept', {
                from: users,
            });

            if (!data.ok) {
                throw new Error();
            }
            setFriend(data.Friends);
            // @ts-ignore
            setUser({ ...user, Friends: data.data.Friends });
            toast({
                title: 'Request Succesfull',
                description: `You are now friends with ${users}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch {
            toast({
                title: 'Couldnt complete your request',
                description: 'please try again later',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Your Friend Requestes</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDir="column" alignItems="center">
                    {loading ? (
                        <CircularProgress isIndeterminate color="green.300" />
                    ) : (
                        friend?.map((el) => {
                            if (el.status === 'PENDING' && el.source !== 'SEND') {
                                return (
                                    <AddFriendCard
                                        name={el.userName}
                                        key={el.id}
                                        onClick={acceptFriend}
                                    />
                                );
                            }
                            return null;
                        })
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
