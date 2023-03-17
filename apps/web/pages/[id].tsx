import React, { useEffect, useState } from 'react';
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

const Page: NextPageWithLayout = () => {
    const toast = useToast();
    const [userInfo, setUser] = useState<ProfileForm | null>(null);
    const { user, setLoading } = useAuth();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isOwnAccount = user?.username === userInfo?.username;

    useEffect(() => {
        const { id } = router.query;
        if (id !== user?.username) {
            (async () => {
                try {
                    setLoading(true);
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
    }, [router]);

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
                                    240 friends
                                </Heading>
                                {user?.username !== userInfo?.username && (
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

                            {user?.username === userInfo?.username && (
                                <Button colorScheme="blue" variant="outline" onClick={onOpen}>
                                    edit profile
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                    <Divider />
                    <FriendTabs isOwnAccount={isOwnAccount} />
                </Box>
            </VStack>
        </HStack>
    );
};
Page.Layout = UserLayout;

export default Page;
