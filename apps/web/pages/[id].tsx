import React from 'react';
import { UserLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { VStack, Heading, HStack, Box, Avatar, Flex, Button, Divider } from '@chakra-ui/react';
import { FriendTabs } from '@app/views/profile';

const Page: NextPageWithLayout = () => (
    <HStack m={{ base: 'none', md: '100px' }} mt="20px">
        <VStack w="100%" minH="60vh">
            <Box w="100%" display="flex" justifyContent="space-between" flexDir="column">
                <Flex justifyContent="space-between" p="4" flexDir={{ base: 'column', md: 'row' }}>
                    <HStack>
                        <Avatar
                            w={{ base: '100px', md: '200px' }}
                            h={{ base: '100px', md: '200px' }}
                            borderRadius="md"
                            mr="20px"
                        />
                        <Box>
                            <Heading fontSize={{ base: '20px', md: '40px' }}>
                                {' '}
                                Sreehari jayaraj
                            </Heading>
                            <Box w="300px" _hover={{ cursor: 'pointer' }}>
                                chasing dreams💖
                            </Box>
                            <Heading fontSize="15px" mt="10px" fontWeight="500">
                                240 friends
                            </Heading>
                            <Button
                                fontSize="15px"
                                mt="10px"
                                fontWeight="500"
                                colorScheme="blue"
                                variant="outline"
                            >
                                Add Friend
                            </Button>
                        </Box>
                    </HStack>
                    <Flex
                        flexDirection={{ base: 'row', md: 'column' }}
                        rowGap="20px"
                        columnGap="10px"
                        mt="10px"
                    >
                        <Button colorScheme="pink">instagram</Button>
                        <Button colorScheme="blue">Twitter</Button>
                        <Button colorScheme="blue" variant="outline">
                            edit profile
                        </Button>
                    </Flex>
                </Flex>
                <Divider />
                <FriendTabs />
            </Box>
        </VStack>
    </HStack>
);
Page.Layout = UserLayout;

export default Page;
