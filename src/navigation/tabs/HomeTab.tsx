import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UsersStackNavigator from '../stacks/HomeStack';
import { tabBarStyle } from '../navigationStyles';
import SCREENS from '../screenNames';

const Tab = createBottomTabNavigator();

const HOME_TAB = {
  label: 'Home',
  icon: 'home-outline',
} as const;

const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: ({ color }) => (
        <Icon name={HOME_TAB.icon} size={36} color={color} />
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
