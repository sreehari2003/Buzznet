import { Avatar, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

interface Prop {
    name: string;
}

export const AddFriendCard = ({ name }: Prop) => (
    <Flex
        bg="#edede9"
        px="6"
        py="3"
        m="3"
        justifyContent="space-between"
        w="100%"
        alignItems="center"
        borderRadius="lg"
        _hover={{ cursor: 'pointer' }}
    >
        <Avatar />
        <Heading fontSize="xl">{name}</Heading>
        <Button>confirm</Button>
    </Flex>
);
