import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { UserCard } from '@app/components/cards';
import React from 'react';

export const FriendTabs = ({ isOwnAccount }: { isOwnAccount: boolean }) => (
    <Tabs align="end">
        <TabList>
            <Tab w={isOwnAccount ? '100%' : '50%'}>Friends</Tab>
            {!isOwnAccount && <Tab w="50%">Mutual Friends</Tab>}
        </TabList>
        <TabPanels>
            <TabPanel display="flex" flexWrap="wrap">
                <UserCard name="sree" />
                <UserCard name="swathi" />
                <UserCard name="gopan" />
                <UserCard name="surya" />
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
