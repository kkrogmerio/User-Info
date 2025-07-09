import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Colors, Strings } from '@shared/constants';
export const listUsersScreenOptions: NativeStackNavigationOptions = {
  title: Strings.tabLabels.listUsers,
};
export const stackHeaderStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};
export const userDetailsScreenStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
