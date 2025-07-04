import { Alert } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import SCREENS from '@navigation/screenNames';
import { mockUsers } from '@shared/test-utils/mockHelpers';

import useUserDetailsNavigation from './useUserDetailsNavigation';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock Alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('useUserDetailsNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to next user if next exists', () => {
    const { result } = renderHook(() =>
      useUserDetailsNavigation(mockUsers, mockUsers[0]),
    );

    result.current.handleNextUserPress();

    expect(mockNavigate).toHaveBeenCalledWith(SCREENS.UserDetails, {
      user: mockUsers[1],
      users: mockUsers,
    });
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('should show alert if no next user exists', () => {
    const { result } = renderHook(() =>
      useUserDetailsNavigation(mockUsers, mockUsers[2]),
    );

    result.current.handleNextUserPress();

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('No more users!');
  });
});
