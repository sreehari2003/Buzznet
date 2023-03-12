import {
    Avatar,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    useDisclosure,
    MenuList,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

export const UserTopbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Flex
            as="div"
            h="70px"
            shadow="md"
            alignItems="center"
            p={{ base: '2', md: '6' }}
            justifyContent="space-between"
            px={{ base: '20px', md: '100px' }}
            ref={ref}
        >
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} finalFocusRef={ref}>
                <ModalOverlay />
                <ModalContent w="900px">
                    <ModalHeader>
                        <InputGroup w="100%">
                            <InputLeftElement pointerEvents="none">
                                <BiSearchAlt color="gray.300" />
                            </InputLeftElement>
                            <Input type="tel" placeholder="find friends" onClick={() => onOpen()} />
                        </InputGroup>
                    </ModalHeader>
                </ModalContent>
            </Modal>
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
                <Input type="tel" placeholder="find friends" onClick={() => onOpen()} />
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
};
