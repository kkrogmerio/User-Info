import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import SCREENS from '@/navigation/screenNames';
import { mockUsers } from '@shared/test-utils/mockHelpers';

import HomeStackNavigator from './HomeStack';
const MockListUsers = 'MockListUsers';
jest.mock('@features/listUsers/screens', () => {
  const { Text } = require('react-native');
  return {
    ListUsersScreen: () => <Text>{MockListUsers}</Text>,
  };
});

jest.mock('@features/userDetails/screens', () => {
  const { Text } = require('react-native');
  return {
    UserDetailsScreen: () => <Text>UserDetailsScreenMock</Text>,
  };
});

describe('UsersStackNavigator', () => {
  it('should render the Home screen by default', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>,
    );
    expect(getByText(MockListUsers)).toBeTruthy();
  });

  it('should UserDetailsScreen options uses the user name and styles', () => {
    const navigator = HomeStackNavigator();
    const childrenArray = React.Children.toArray(navigator.props.children);
    const userDetailsScreen = childrenArray.find(
      (child): child is React.ReactElement =>
        React.isValidElement(child) && child.props.name === SCREENS.UserDetails,
    );
    expect(userDetailsScreen).toBeTruthy();

    const fakeRoute = { params: { user: { name: mockUsers[0].name } } };
    const options = userDetailsScreen!.props.options({ route: fakeRoute });
    expect(options.title).toBe(mockUsers[0].name);
  });
});
