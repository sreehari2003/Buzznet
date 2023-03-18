import { Tabs, Tab, TabList, TabPanel, TabPanels, useToast } from '@chakra-ui/react';
import { UserCard } from '@app/components/cards';
import React, { useState } from 'react';
import { buzzNetAPI } from '@app/config';

interface Friends {
    userName: string;
    id: string;
    status: 'CONFIRMED' | 'PENDING';
}

type Prop = {
    isOwnAccount: boolean;
    friends: Friends[] | [];
    to: string;
};

export const FriendTabs = ({ isOwnAccount, friends, to }: Prop) => {
    const [datas, setData] = useState<Friends[] | null>(null);
    const toast = useToast();

    const callMutual = async () => {
        try {
            const { data: res } = await buzzNetAPI.get(`/mutual?to=${to}`);
            if (!res.ok) {
                throw new Error(res.message);
            }
            setData(res.data);
        } catch {
            toast({
                title: 'Couldnt update your account info.',
                description: 'user name already exists',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
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
                    {datas && datas.map((el) => <UserCard name={el.userName} key={el.id} />)}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
