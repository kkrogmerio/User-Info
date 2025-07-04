import React from 'react';

import { render } from '@testing-library/react-native';

import AppNavigator from '@navigation/AppNavigator/AppNavigator';
const MOCK_TEST_IDS = {
  HOME_TAB: 'HOME_TAB',
  STATUS_BAR: 'STATUS_BAR',
};

jest.mock('../tabs/HomeTab', () => {
  const { View } = require('react-native');
  return function MockHomeTab() {
    return <View testID={MOCK_TEST_IDS.HOME_TAB}>Home Tab</View>;
  };
});

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => {
  const { View } = require('react-native');
  return function MockStatusBar() {
    return <View testID={MOCK_TEST_IDS.STATUS_BAR} />;
  };
});

describe('AppNavigator', () => {
  it('should render StatusBar and HomeTab navigator', () => {
    const { getByTestId } = render(<AppNavigator />);

    expect(getByTestId(MOCK_TEST_IDS.HOME_TAB)).toBeTruthy();
    expect(getByTestId(MOCK_TEST_IDS.STATUS_BAR)).toBeTruthy();
  });
});
