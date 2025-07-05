import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { Colors, Strings } from '@shared/constants';
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
export const homeTabConfig: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: Strings.tabLabels.home,
};
