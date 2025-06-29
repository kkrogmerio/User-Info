import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../../features/home/screens';
import {UserDetailsScreen} from '../../features/userDetails/screens';
import {RootStackParamList} from '../../types/rootStack';
import {stackHeaderStyle, userDetailsScreenStyle} from '../navigationStyles';
import SCREENS from '../screenNames';
const Stack = createNativeStackNavigator<RootStackParamList>();

const UsersStackNavigator = () => (
  <Stack.Navigator screenOptions={stackHeaderStyle}>
    <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
    <Stack.Screen
      name={SCREENS.UserDetails}
      component={UserDetailsScreen}
      options={({route}) => ({
        title: route.params.user.name,
        ...userDetailsScreenStyle,
      })}
    />
  </Stack.Navigator>
);

export default UsersStackNavigator;
