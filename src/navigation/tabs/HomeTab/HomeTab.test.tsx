import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { TEST_IDS } from '@shared/constants';

import HomeTabNavigator from '.';
import { HOME_TAB_ICON } from './HomeTabIcon';

const HOME_STACK_MOCK = 'HomeStackMock';

// Mock the stack navigator
jest.mock('@/navigation/stacks/HomeStack', () => () => {
  const { Text } = require('react-native');
  return <Text>{HOME_STACK_MOCK}</Text>;
});

// Mock the icon component
jest.mock('../TabBarIcon', () => ({
  TabBarIcon: ({
    icon,
    color,
    testID,
  }: {
    icon: string;
    color: string;
    testID: string;
  }) => {
    const { Text } = require('react-native');
    return (
      <Text testID={testID}>
        {icon}-{color}
      </Text>
    );
  },
}));

describe('HomeTabNavigator', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes(
          'Warning: An update to Animated(View) inside a test was not wrapped in act',
        )
      ) {
        return;
      }
      originalConsoleError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });
  it('should render the HomeStack in the tab', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeTabNavigator />
      </NavigationContainer>,
    );
    expect(getByText(HOME_STACK_MOCK)).toBeTruthy();
  });

  it('should render the tab bar icon with correct testID and icon name', () => {
    const { getAllByTestId } = render(
      <NavigationContainer>
        <HomeTabNavigator />
      </NavigationContainer>,
    );
    const icons = getAllByTestId(TEST_IDS.HOME_TAB.ICON);
    expect(icons.length).toBeGreaterThan(0);
    expect(
      icons.some(icon => String(icon.props.children).includes(HOME_TAB_ICON)),
    ).toBe(true);
  });
});
