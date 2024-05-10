import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UsersStackNavigator from '../stacks/HomeStack';
import {tabBarStyle} from '../navigationStyles';
import SCREENS from '../screenNames';
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarIcon: ({color}) => (
        <Icon name={'home-outline'} size={36} color={color} />
      ),
      ...tabBarStyle,
    })}>
    <Tab.Screen
      name={SCREENS.HomeTab}
      component={UsersStackNavigator}
      options={{headerShown: false, tabBarLabel: 'Home'}}
    />
  </Tab.Navigator>
);

export default AppTabNavigator;
