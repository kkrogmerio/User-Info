import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Colors } from '@shared/constants';
export const tabBarStyle: BottomTabNavigationOptions = {
  tabBarActiveTintColor: Colors.primary,
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  tabBarStyle: {
    height: 100,
    paddingBottom: 25,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ffffff',
    position: 'absolute',
    borderTopWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { height: -5, width: 0 },
  },
  tabBarShowLabel: true,
};

export const stackHeaderStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};
export const userDetailsScreenStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
