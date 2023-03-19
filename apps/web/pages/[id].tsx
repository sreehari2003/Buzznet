import React, { useEffect, useState, useMemo } from 'react';
import { UserLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import {
    VStack,
    Heading,
    HStack,
    Box,
    Avatar,
    Flex,
    Button,
    Divider,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import { FriendTabs, EditProfile } from '@app/views/profile';
import { useAuth } from '@app/hooks';
import { useRouter } from 'next/router';
import { ProfileForm } from '@app/views/signup';
import { buzzNetAPI } from '@app/config';
import { Loader } from '@app/layout/components/Loader';
import Cookies from 'js-cookie';

type Friend = {
    id: string;
    status: 'PENDING' | 'CONFIRMED';
    userName: string;
    source: 'SEND' | 'RECEIVED';
};

export interface User extends ProfileForm {
    Friends: Friend[] | null;
}

const Page: NextPageWithLayout = () => {
    const toast = useToast();
    const [userInfo, setUser] = useState<User | null>(null);
    const { user, setLoading } = useAuth();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isOwnAccount = user?.username === userInfo?.username;
    const isAlreadyFriend = userInfo?.Friends?.some((el) => el.userName === user?.username);

    // using this to prevent the recomputation of number of friends
    const numberOfFriends = useMemo(() => {
        if (userInfo?.Friends) {
            return userInfo.Friends.reduce(
                (acc, el) => acc + (el.status === 'CONFIRMED' ? 1 : 0),
                0,
            );
        }
        return [];
    }, [userInfo]);

    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;
        if (id !== user?.username) {
            (async () => {
                try {
                    setLoading(true);
                    const token = Cookies.get('jwtID');
                    buzzNetAPI.defaults.headers.common.authorization = `Bearer ${token}`;
                    const { data: resp } = await buzzNetAPI.get(`/user?username=${id}`);
                    if (!resp.ok) {
                        throw new Error();
                    }
                    setUser(resp.data);
                } catch {
                    router.push('/404');
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setUser(user);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady, user]);

    const addFriend = async () => {
        try {
            const { data: resp } = await buzzNetAPI.post(`/add`, {
                from: user?.username,
                to: userInfo?.username,
            });
            if (!resp.ok) {
                throw new Error();
            }
            toast({
                title: 'friend request sent',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch {
            toast({
                title: 'failed to send friend request',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const unFriend = async () => {
        try {
            const { data: resp } = await buzzNetAPI.post(`/remove`, {
                from: user?.Friends?.find((el) => el.userName === userInfo?.username),
                to: userInfo?.Friends?.find((el) => el.userName === user?.username),
            });
            if (!resp.ok) {
                throw new Error();
            }
            toast({
                title: 'unfriend was done',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch {
            toast({
                title: 'failed to un friend the user',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    if (!router.isReady) {
        return <Loader />;
    }

    return (
        <HStack m={{ base: 'none', md: '100px' }} mt="20px">
            <EditProfile onClose={onClose} isOpen={isOpen} />
            <VStack w="100%" minH="60vh">
                <Box w="100%" display="flex" justifyContent="space-between" flexDir="column">
                    <Flex
                        justifyContent="space-between"
                        p="4"
                        flexDir={{ base: 'column', md: 'row' }}
                    >
                        <HStack>
                            <Avatar
                                w={{ base: '100px', md: '200px' }}
                                h={{ base: '100px', md: '200px' }}
                                borderRadius="md"
                                mr="20px"
                            />
                            <Box>
                                <Heading fontSize={{ base: '20px', md: '40px' }}>
                                    {userInfo?.name}
                                </Heading>
                                <Heading fontSize={{ base: '15px', md: '25px' }}>
                                    username: {userInfo?.username}
                                </Heading>
                                <Box w="300px" _hover={{ cursor: 'pointer' }}>
                                    {userInfo?.bio}
                                </Box>
                                <Heading fontSize="15px" mt="10px" fontWeight="500">
                                    {numberOfFriends} friends
                                </Heading>
                                {!isOwnAccount && !isAlreadyFriend && (
                                    <Button
                                        fontSize="15px"
                                        mt="10px"
                                        fontWeight="500"
                                        colorScheme="blue"
                                        variant="outline"
                                        onClick={addFriend}
                                    >
                                        Add Friend
                                    </Button>
                                )}
                                {!isOwnAccount && isAlreadyFriend && (
                                    <Button
                                        fontSize="15px"
                                        mt="10px"
                                        fontWeight="500"
                                        colorScheme="blue"
                                        variant="outline"
                                        onClick={unFriend}
                                    >
                                        Unfriend
                                    </Button>
                                )}
                            </Box>
                        </HStack>
                        <Flex
                            flexDirection={{ base: 'row', md: 'column' }}
                            rowGap="20px"
                            columnGap="10px"
                            mt="10px"
                        >
                            {userInfo?.instagram && (
                                <Button
                                    as="a"
                                    colorScheme="pink"
                                    href={`https://www.instagram.com/${userInfo.instagram}`}
                                    target="_blank"
                                >
                                    instagram
                                </Button>
                            )}
                            {userInfo?.twitter && (
                                <Button
                                    colorScheme="blue"
                                    as="a"
                                    href={`https://www.twitter.com/${userInfo.twitter}`}
                                >
                                    Twitter
                                </Button>
                            )}

                            {isOwnAccount && (
                                <Button colorScheme="blue" variant="outline" onClick={onOpen}>
                                    edit profile
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                    <Divider />
                    <FriendTabs
                        isOwnAccount={isOwnAccount}
                        friends={userInfo?.Friends || []}
                        to={userInfo?.username || ''}
                    />
                </Box>
            </VStack>
        </HStack>
    );
};
Page.Layout = UserLayout;

export default Page;
