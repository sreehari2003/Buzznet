import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import React from 'react';

export const FriendTabs = () => (
    <Tabs align="end">
        <TabList>
            <Tab w="50%">Friends</Tab>
            <Tab w="50%">Mutual Friends</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <p>one!</p>
            </TabPanel>
            <TabPanel>
                <p>two!</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
);
