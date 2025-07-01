import {renderHook} from '@testing-library/react-native';
import useUserDetailsNavigation from './useUserDetailsNavigation';
import {mockUsers} from '@test-utils/mockHelpers';
import SCREENS from '@navigation/screenNames';
import {Alert} from 'react-native';

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
    const {result} = renderHook(() =>
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
    const {result} = renderHook(() =>
      useUserDetailsNavigation(mockUsers, mockUsers[2]),
    );

    result.current.handleNextUserPress();

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('No more users!');
  });
});
