import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';

import SCREENS from '@/navigation/screenNames';
import { ACCESSIBILITY_HINTS, TEST_IDS } from '@shared/constants';
import { mockProps, mockUsers } from '@shared/test-utils/mockHelpers';
import { RootStackParamList, User } from '@shared/types';

import { UserDetailsScreen } from '.';

// Mock navigation route params
const mockUser: User = {
  id: 1,
  name: 'Alice',
  username: 'alice',
  phone: '123',
  email: 'alice@gmail.com',
};

const mockHandleNextUserPress = jest.fn();

// Mock the custom hook
jest.mock('../hooks/useUserDetailsNavigation', () =>
  jest.fn(() => ({
    handleNextUserPress: mockHandleNextUserPress,
  })),
);

const mockRoute = {
  params: {
    user: mockUser,
    users: mockUsers,
  },
} as RouteProp<RootStackParamList, SCREENS.UserDetails>;

describe('UserDetailsScreen', () => {
  it('should render the container with correct testID and accessibilityHint', () => {
    const { getByTestId } = render(
      <UserDetailsScreen {...mockProps} route={mockRoute} />,
    );
    const container = getByTestId(TEST_IDS.USER_DETAILS_SCREEN.CONTAINER);
    expect(container).toBeTruthy();
    expect(container.props.accessibilityHint).toBe(
      ACCESSIBILITY_HINTS.AFTER_READING_USER_INFORMATION,
    );
  });

  it('should render the correct user fields for email and phone', () => {
    const { getByTestId } = render(
      <UserDetailsScreen {...mockProps} route={mockRoute} />,
    );
    expect(getByTestId(TEST_IDS.USER_ITEM.EMAIL)).toBeTruthy();
    expect(getByTestId(TEST_IDS.USER_ITEM.EMAIL_VALUE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.USER_ITEM.PHONE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.USER_ITEM.PHONE_VALUE)).toBeTruthy();
  });

  it('should render NextUserButton', () => {
    const { getByTestId } = render(
      <UserDetailsScreen {...mockProps} route={mockRoute} />,
    );
    expect(
      getByTestId(TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON),
    ).toBeTruthy();
  });

  it('should call handleNextUserPress when NextUserButton is pressed', () => {
    const { getByTestId } = render(
      <UserDetailsScreen {...mockProps} route={mockRoute} />,
    );
    fireEvent.press(getByTestId(TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON));
    expect(mockHandleNextUserPress).toHaveBeenCalled();
  });
});
