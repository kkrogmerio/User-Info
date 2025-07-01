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

const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: ({ color }) => (
        <TabBarIcon icon={HOME_TAB.icon} color={color} />
      ),
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
