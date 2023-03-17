import {
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    useToast,
    CircularProgress,
    Heading,
} from '@chakra-ui/react';
import { UserCard } from '@app/components/cards';
import React, { useEffect, useState } from 'react';
import { buzzNetAPI } from '@app/config';
import Cookies from 'js-cookie';

type Friend = {
    id: string;
    status: 'PENDING' | 'CONFIRMED';
    userName: string;
};

export const FriendTabs = ({ isOwnAccount }: { isOwnAccount: boolean }) => {
    const [friend, setFriend] = useState<Friend[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const token = Cookies.get('jwtID');
                buzzNetAPI.defaults.headers.common.authorization = `Bearer ${token}`;
                const { data } = await buzzNetAPI.get('/friend');
                if (!data.ok) {
                    throw new Error();
                }

                setFriend(data.data.Friends);
            } catch {
                toast({
                    title: 'Couldnt complete your request',
                    description: 'please try again later',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Tabs align="end">
            <TabList>
                <Tab w={isOwnAccount ? '100%' : '50%'}>Friends</Tab>
                {!isOwnAccount && <Tab w="50%">Mutual Friends</Tab>}
            </TabList>
            <TabPanels>
                <TabPanel display="flex" flexWrap="wrap">
                    {loading ? (
                        <CircularProgress isIndeterminate color="blue" />
                    ) : (
                        friend?.map((el) => {
                            if (el.status === 'CONFIRMED') {
                                return <UserCard name={el.userName} key={el.id} />;
                            }
                            return (
                                <Heading textAlign="center" fontSize="20px">
                                    No friends yet
                                </Heading>
                            );
                        })
                    )}
                    {friend?.length === 0 && (
                        <Heading textAlign="center" fontSize="20px">
                            No friends yet
                        </Heading>
                    )}
                </TabPanel>
                <TabPanel display="flex" flexWrap="wrap">
                    <UserCard name="sree" />
                    <UserCard name="swathi" />
                    <UserCard name="gopan" />
                    <UserCard name="surya" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
