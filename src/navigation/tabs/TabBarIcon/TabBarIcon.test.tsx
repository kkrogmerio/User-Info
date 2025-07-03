// TabBarIcon.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { TabBarIcon } from '.';
import { TEST_IDS } from '@/constants';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const { View } = require('react-native');
  return ({
    name,
    color,
    size,
    testID,
  }: {
    name: string;
    color: string;
    size: number;
    testID: string;
  }) => (
    <View testID={testID}>
      {name}, {color}, {size}
    </View>
  );
});
const ICON_HOME = 'home-outline';
const ICON_ACCOUNT = 'account';
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const SIZE_24 = 24;
const SIZE_36 = 36;

describe('TabBarIcon', () => {
  it('should render with the correct props', () => {
    const { getByTestId } = render(
      <TabBarIcon
        icon={ICON_HOME}
        color={COLOR_RED}
        size={SIZE_24}
        testID={TEST_IDS.HOME_SCREEN.HOME_ICON}
      />,
    );
    const icon = getByTestId(TEST_IDS.HOME_SCREEN.HOME_ICON);
    const childrenString = Array.isArray(icon.props.children)
      ? icon.props.children.join('')
      : icon.props.children;

    expect(childrenString).toContain(ICON_HOME);
    expect(childrenString).toContain(COLOR_RED);
    expect(childrenString).toContain(String(SIZE_24));
  });

  it('should have default size to 36', () => {
    const { getByTestId } = render(
      <TabBarIcon
        icon={ICON_ACCOUNT}
        color={COLOR_BLUE}
        testID={TEST_IDS.HOME_SCREEN.HOME_ICON}
      />,
    );
    const icon = getByTestId(TEST_IDS.HOME_SCREEN.HOME_ICON);
    const childrenString = Array.isArray(icon.props.children)
      ? icon.props.children.join('')
      : icon.props.children;

    expect(childrenString).toContain(ICON_ACCOUNT);
    expect(childrenString).toContain(COLOR_BLUE);
    expect(childrenString).toContain(String(SIZE_36));
  });
});
