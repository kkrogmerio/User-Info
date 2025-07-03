import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '@/navigation/stacks/HomeStack';
import { tabBarStyle } from '@navigation/navigationStyles';
import SCREENS from '@navigation/screenNames';
import { TabBarIcon } from '../TabBarIcon';
import { TEST_IDS } from '@shared/constants';

const Tab = createBottomTabNavigator();

export const HOME_TAB = {
  label: 'Home',
  icon: 'home-outline',
} as const;

const HomeTabIcon = ({ color }: { color: string }) => (
  <TabBarIcon
    icon={HOME_TAB.icon}
    color={color}
    testID={TEST_IDS.HOME_SCREEN.HOME_ICON}
  />
);

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: HomeTabIcon,
      ...tabBarStyle,
    })}>
    <Tab.Screen
      name={SCREENS.HomeTab}
      component={HomeStackNavigator}
      options={{ headerShown: false, tabBarLabel: HOME_TAB.label }}
    />
  </Tab.Navigator>
);

export default HomeTabNavigator;
