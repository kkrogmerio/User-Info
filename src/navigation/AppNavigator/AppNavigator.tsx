import React from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { Colors } from '@shared/constants';

import HomeTab from '../tabs/HomeTab';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} translucent={false} />
      <HomeTab />
    </NavigationContainer>
  );
};

export default AppNavigator;
