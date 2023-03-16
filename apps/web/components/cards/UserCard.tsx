import { Avatar, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';

interface Prop {
    width?: string;
    name: string;
}

export const UserCard = ({ width = '300px', name }: Prop) => (
    <Link href={`/${name}`}>
        <Flex
            bg="#edede9"
            px="6"
            py="3"
            m="3"
            justifyContent="space-between"
            w={width}
            alignItems="center"
            borderRadius="lg"
            _hover={{ cursor: 'pointer' }}
        >
            <Avatar />
            <Heading fontSize="xl">{name}</Heading>
        </Flex>
    </Link>
);
