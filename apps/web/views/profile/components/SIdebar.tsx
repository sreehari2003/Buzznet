import { Center, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

export const Sidebar = () => (
    <VStack w="250px" minH="90vh" display={{ base: 'none', lg: 'block' }} p="3">
        <Center>
            <Heading fontSize="lg">Mutual friends</Heading>
        </Center>
    </VStack>
);
