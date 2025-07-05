import React from 'react';

import { TEST_IDS } from '@/shared/constants';

import { TabBarIcon } from '../TabBarIcon';
export const HOME_TAB_ICON = 'home-outline';
export const HomeTabIcon = ({ color }: { color: string }) => (
  <TabBarIcon
    icon={HOME_TAB_ICON}
    color={color}
    testID={TEST_IDS.HOME_TAB.ICON}
  />
);
