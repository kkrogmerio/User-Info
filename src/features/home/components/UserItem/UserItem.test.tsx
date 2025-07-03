import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserItem } from '.';
import { User } from '@shared/types/user';
import { TEST_IDS } from '@shared/constants';
import { mockUsers } from '@shared/test-utils/mockHelpers';
import { userAccessibilityLabel } from '../../utils/userAccessibilityLabel';
import SCREENS from '@/navigation/screenNames';

// 1. Mock useNavigation from @react-navigation/native
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('UserItem Component', () => {
  const mockCurrentUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    phone: '+1234567890',
    email: 'john@gmail.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all user information correctly', () => {
      const { getByText, getByTestId } = render(
        <UserItem currentUser={mockCurrentUser} users={mockUsers} />,
      );

      // Verify main container exists
      expect(getByTestId(TEST_IDS.USER_ITEM.CARD)).toBeTruthy();
      expect(getByTestId(TEST_IDS.USER_ITEM.CONTENT)).toBeTruthy();

      // Verify user data is displayed
      expect(getByText(mockCurrentUser.name)).toBeTruthy();
      expect(getByText(mockCurrentUser.username)).toBeTruthy();

      // Verify testIDs are applied correctly
      expect(getByTestId(TEST_IDS.USER_ITEM.NAME)).toBeTruthy();
      expect(getByTestId(TEST_IDS.USER_ITEM.USERNAME)).toBeTruthy();
    });

    it('should render with special characters in user data', () => {
      const userWithSpecialChars: User = {
        ...mockCurrentUser,
        name: "José María O'Connor",
        username: 'josé_maría123',
        phone: '+34-123-456-789',
      };

      const { getByText } = render(
        <UserItem currentUser={userWithSpecialChars} users={mockUsers} />,
      );

      expect(getByText(userWithSpecialChars.name)).toBeTruthy();
      expect(getByText(userWithSpecialChars.username)).toBeTruthy();
    });
  });

  describe('User Interaction', () => {
    it('should call navigate with correct params when card is pressed', () => {
      const { getByTestId } = render(
        <UserItem currentUser={mockCurrentUser} users={mockUsers} />,
      );

      const card = getByTestId(TEST_IDS.USER_ITEM.CARD);
      fireEvent.press(card);

      expect(mockNavigate).toHaveBeenCalledWith(SCREENS.UserDetails, {
        user: mockCurrentUser,
        users: mockUsers,
      });
    });
  });

  describe('Props Validation', () => {
    it('should call navigate with a single user in the array', () => {
      const singleUserArray = [mockCurrentUser];

      const { getByTestId } = render(
        <UserItem currentUser={mockCurrentUser} users={singleUserArray} />,
      );

      const card = getByTestId(TEST_IDS.USER_ITEM.CARD);
      fireEvent.press(card);

      expect(mockNavigate).toHaveBeenCalledWith(SCREENS.UserDetails, {
        user: mockCurrentUser,
        users: singleUserArray,
      });
    });
  });
  describe('Accessibility', () => {
    it('should have accessibilityRole "button" and correct accessibilityLabel', () => {
      const { getByTestId } = render(
        <UserItem currentUser={mockCurrentUser} users={mockUsers} />,
      );

      const card = getByTestId(TEST_IDS.USER_ITEM.CARD);
      // Check role
      expect(card.props.accessibilityRole).toBe('button');
      // Check label
      expect(card.props.accessibilityLabel).toBe(
        userAccessibilityLabel(mockCurrentUser.name, mockCurrentUser.username),
      );
    });
  });
});
