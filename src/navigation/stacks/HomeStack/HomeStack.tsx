import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ListUsersScreen } from '@/features/listUsers/screens';
import { UserDetailsScreen } from '@features/userDetails/screens';
import SCREENS from '@navigation/screenNames';
import { RootStackParamList } from '@shared/types';

import { stackHeaderStyle, userDetailsScreenStyle } from '.';
import { listUsersScreenOptions } from './HomeStack.style';
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={stackHeaderStyle}>
    <Stack.Screen
      name={SCREENS.ListUsers}
      component={ListUsersScreen}
      options={listUsersScreenOptions}
    />
    <Stack.Screen
      name={SCREENS.UserDetails}
      component={UserDetailsScreen}
      options={({ route }) => ({
        title: route.params.user.name,
        ...userDetailsScreenStyle,
      })}
    />
  </Stack.Navigator>
);

export default HomeStackNavigator;
