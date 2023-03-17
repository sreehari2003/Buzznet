import {
    CircularProgress,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
    Text,
} from '@chakra-ui/react';
import { AddFriendCard } from '@app/components/cards';
import { useEffect, useState } from 'react';
import { buzzNetAPI } from '@app/config';

type Modals = {
    isOpen: boolean;
    onClose: () => void;
};

type Friend = {
    id: string;
    status: 'PENDING' | 'CONFIRMED';
    userName: string;
};

export const AddFriend = ({ isOpen, onClose }: Modals) => {
    const [loading, setLoading] = useState<boolean>(false);
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

    const acceptFriend = async (user: string) => {
        try {
            const { data } = await buzzNetAPI.post('/accept', {
                from: user,
            });

            if (!data.ok) {
                throw new Error();
            }
            setFriend(data.Friends);
            toast({
                title: 'Request Succesfull',
                description: `You are now friends with ${user}`,
                status: 'error',
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
                            if (el.status === 'PENDING') {
                                return (
                                    <AddFriendCard
                                        name={el.userName}
                                        key={el.id}
                                        onClick={acceptFriend}
                                    />
                                );
                            }
                            return <Text>No friend request yet</Text>;
                        })
                    )}
                    {friend?.length === 0 && <Text>No friend request yet</Text>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
