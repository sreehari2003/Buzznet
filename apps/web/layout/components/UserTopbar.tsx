import {
    Avatar,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Kbd,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

export const UserTopbar = () => (
    <Flex
        h="70px"
        shadow="md"
        alignItems="center"
        p={{ base: '2', md: '6' }}
        justifyContent="space-between"
        px={{ base: '20px', md: '100px' }}
    >
        <Link href="/">
            <Heading
                textAlign="center"
                fontSize="30px"
                bg="linear-gradient(179.2deg, rgb(21, 21, 212) 0.9%, rgb(53, 220, 243) 95.5%)"
                bgClip="text"
            >
                Buzznet
            </Heading>
        </Link>
        <InputGroup w={{ base: '200px', md: '500px' }}>
            <InputLeftElement pointerEvents="none">
                <BiSearchAlt color="gray.300" />
            </InputLeftElement>
            <Input type="tel" placeholder="find friends" />
            <InputRightElement width="4.5rem">
                <Kbd>ctrl</Kbd> + <Kbd>K</Kbd>
            </InputRightElement>
        </InputGroup>
        <Menu>
            <MenuButton as={Avatar} _hover={{ cursor: 'pointer' }} />
            <MenuList>
                <MenuItem>My Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>
    </Flex>
);
