import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import HomeTab from '../tabs/HomeTab';
import { Colors } from '@constants';
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} translucent={false} />
      <HomeTab />
    </NavigationContainer>
  );
};

export default AppNavigator;
