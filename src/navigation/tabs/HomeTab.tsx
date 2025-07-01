import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersStackNavigator from '../stacks/HomeStack';
import { tabBarStyle } from '../navigationStyles';
import SCREENS from '../screenNames';
import { TabBarIcon } from './TabBarIcon';

const Tab = createBottomTabNavigator();

const HOME_TAB = {
  label: 'Home',
  icon: 'home-outline',
} as const;

const HomeTabIcon = ({ color }: { color: string }) => (
  <TabBarIcon icon={HOME_TAB.icon} color={color} />
);

const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: HomeTabIcon,
      ...tabBarStyle,
    })}>
    <Tab.Screen
      name={SCREENS.HomeTab}
      component={UsersStackNavigator}
      options={{ headerShown: false, tabBarLabel: HOME_TAB.label }}
    />
  </Tab.Navigator>
);

export default AppTabNavigator;
