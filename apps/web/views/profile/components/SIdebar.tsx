import {
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    useToast,
    CircularProgress,
} from '@chakra-ui/react';
import { UserCard } from '@app/components/cards';
import React, { useState } from 'react';
import { buzzNetAPI } from '@app/config';

interface Friends {
    userName: string;
    id: string;
    status: 'CONFIRMED' | 'PENDING';
}

interface Mutual {
    username: string;
    id: string;
}

type Prop = {
    isOwnAccount: boolean;
    friends: Friends[] | [];
    to: string;
};

export const FriendTabs = ({ isOwnAccount, friends, to }: Prop) => {
    const [datas, setData] = useState<Mutual[] | null>(null);
    const [mutualLoading, setMutualLoading] = useState<boolean>(false);
    const toast = useToast();

    const callMutual = async () => {
        try {
            setMutualLoading(true);
            const { data: res } = await buzzNetAPI.get(`/mutual?to=${to}`);
            if (!res.ok) {
                throw new Error(res.message);
            }
            setData(res.data);
        } catch {
            toast({
                title: 'Couldnt complete your request',
                description: 'please tru again later',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setMutualLoading(false);
        }
    };

    return (
        <Tabs align="end">
            <TabList>
                <Tab w={isOwnAccount ? '100%' : '50%'}>Friends</Tab>
                {!isOwnAccount && (
                    <Tab w="50%" onClick={callMutual}>
                        Mutual Friends
                    </Tab>
                )}
            </TabList>
            <TabPanels>
                <TabPanel display="flex" flexWrap="wrap">
                    {friends?.map((el) => {
                        if (el.status === 'CONFIRMED') {
                            return <UserCard name={el.userName} key={el.id} />;
                        }
                        return null;
                    })}
                </TabPanel>
                <TabPanel display="flex" flexWrap="wrap">
                    {mutualLoading && <CircularProgress isIndeterminate color="green.300" />}
                    {!mutualLoading &&
                        datas &&
                        datas.map((el) => <UserCard name={el.username} key={el.id} />)}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
