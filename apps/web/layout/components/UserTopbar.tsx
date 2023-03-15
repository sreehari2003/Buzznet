import { buzzNetAPI } from '@app/config';
import { useAuth } from '@app/hooks';
import { debounce } from '@app/utils/debounce';
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
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

export const UserTopbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState<any>(null);

    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);
    const { logOut, user } = useAuth();

    const myProfile = () => {
        router.push(`/${user?.username}`);
    };

    const searchUsers = async (id: string) => {
        try {
            const { data: resp } = await buzzNetAPI.get(`/user?username=${id}`);
            if (!resp.ok) {
                throw new Error();
            }
            setSearch(resp.data);
        } catch {
            /* empty */
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadUsers = useCallback(
        debounce((inputValue: string, callback: (options: any) => void) => {
            searchUsers(inputValue).then((options) => {
                callback(options);
            });
        }),
        [],
    );

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
                            <Input
                                type="tel"
                                placeholder="find friends"
                                onClick={() => onOpen()}
                                onChange={(e) => loadUsers(e.target.value, searchUsers)}
                            />
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
                <Input
                    type="tel"
                    placeholder="find friends"
                    onClick={() => onOpen()}
                    onChange={(e) => loadUsers(e.target.value, searchUsers)}
                />
            </InputGroup>
            <Menu>
                <MenuButton as={Avatar} _hover={{ cursor: 'pointer' }} />
                <MenuList>
                    <MenuItem onClick={myProfile}> Profile</MenuItem>
                    <MenuItem onClick={myProfile}>Friend requests</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};
