import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';

interface Prop {
    name: string;
    onClick: (state: string) => void;
}

export const AddFriendCard = ({ name, onClick }: Prop) => (
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
        <Link href={`/${name}`}>
            <Heading fontSize="xl">{name}</Heading>
        </Link>
        <Button colorScheme="blackAlpha" onClick={() => onClick(name)}>
            confirm
        </Button>
    </Flex>
);
