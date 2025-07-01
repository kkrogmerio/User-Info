import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserDetailsScreen from './UserDetailsScreen';
import {TEST_IDS} from '../../../constants/testIds';
import {ACCESSIBILITY_ROLES, Strings} from '../../../constants';
import {mockProps, mockUsers} from '../../../test-utils/mockHelpers';
import {RootStackParamList} from '../../../types/rootStack';
import {RouteProp} from '@react-navigation/native';
import SCREENS from '../../../navigation/screenNames';

// Mock navigation route params
const mockUser = {id: 1, name: 'Alice', username: 'alice', phone: '123'};

const mockHandleNextUserPress = jest.fn();

// Mock the custom hook
jest.mock('../../../hooks/useUserDetailsNavigation', () =>
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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Rendering', () => {
    it('should render the container view with correct testID', () => {
      const {getByTestId} = render(
        <UserDetailsScreen {...mockProps} route={mockRoute} />,
      );
      expect(getByTestId(TEST_IDS.USER_DETAILS_SCREEN.CONTAINER)).toBeTruthy();
    });

    it('should render the username text with correct value, testID and accessibility role', () => {
      const {getByTestId} = render(
        <UserDetailsScreen {...mockProps} route={mockRoute} />,
      );
      const usernameText = getByTestId(TEST_IDS.USER_DETAILS_SCREEN.USERNAME);
      expect(usernameText.props.children).toContain(Strings.username);
      expect(usernameText.props.children).toContain(mockUser.username);
      expect(usernameText.props.accessibilityRole).toBe(
        ACCESSIBILITY_ROLES.HEADER,
      );
    });

    it('should render the "next user" button with correct text and testID', () => {
      const {getByTestId} = render(
        <UserDetailsScreen {...mockProps} route={mockRoute} />,
      );
      const buttonText = getByTestId(
        TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_TEXT,
      );
      expect(buttonText.props.children).toBe(Strings.nextUser);
    });
  });
  describe('user interaction', () => {
    it('should call handleNextUserPress when next user button is pressed', () => {
      const {getByTestId} = render(
        <UserDetailsScreen {...mockProps} route={mockRoute} />,
      );
      const button = getByTestId(TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON);
      fireEvent.press(button);
      expect(mockHandleNextUserPress).toHaveBeenCalled();
    });
  });
});
