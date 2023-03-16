import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { UserCard } from '@app/components/cards';
import React from 'react';

export const FriendTabs = () => (
    <Tabs align="end">
        <TabList>
            <Tab w="50%">Friends</Tab>
            <Tab w="50%">Mutual Friends</Tab>
        </TabList>
        <TabPanels>
            <TabPanel display="flex" flexWrap="wrap">
                <UserCard name="sree" />
                <UserCard name="swathi" />
                <UserCard name="gopan" />
                <UserCard name="surya" />
            </TabPanel>
            <TabPanel>
                <p>two!</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
);
