import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from '@/navigation/stacks/HomeStack';
import { homeTabConfig, tabBarStyle } from '@navigation/navigationStyles';
import SCREENS from '@navigation/screenNames';

import { HomeTabIcon } from '.';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: HomeTabIcon,
      ...tabBarStyle,
    })}>
    <Tab.Screen
      name={SCREENS.HomeTab}
      component={HomeStackNavigator}
      options={homeTabConfig}
    />
  </Tab.Navigator>
);

export default HomeTabNavigator;
