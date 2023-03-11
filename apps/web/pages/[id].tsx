import React from 'react';
import { UserLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { VStack, Heading, HStack, Box, Image, Avatar, Flex, Button } from '@chakra-ui/react';
import { Sidebar } from '@app/views/profile';

const Page: NextPageWithLayout = () => (
    <HStack>
        <Sidebar />
        <VStack w="100%" minH="90vh">
            <Image src="/cover.jpg" h="450px" w="100%" />
            <Box
                border="1px solid red"
                w="100%"
                display="flex"
                justifyContent="space-between"
                flexDir="column"
            >
                <Flex justifyContent="space-between" p="4" flexDir={{ base: 'column', md: 'row' }}>
                    <HStack>
                        <Avatar w="200px" h="200px" borderRadius="md" mr="20px" />
                        <Box>
                            <Heading>Sreehari jayaraj</Heading>
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
            </Box>
        </VStack>
    </HStack>
);
Page.Layout = UserLayout;

export default Page;
