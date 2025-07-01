import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserItem } from '.';
import { User } from '@/types/user';
import { TEST_IDS } from '@constants';
import { mockUsers } from '@test-utils/mockHelpers';

// Mock the custom hook
jest.mock('@hooks/useUserDetailsNavigation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useUserDetailsNavigationMock = require('@hooks/useUserDetailsNavigation')
  .default as jest.Mock;

describe('UserItem Component', () => {
  const mockHandleNextUserPress = jest.fn();

  const mockCurrentUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    phone: '+1234567890',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useUserDetailsNavigationMock.mockReturnValue({
      handleNextUserPress: mockHandleNextUserPress,
    });
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
      expect(getByText(mockCurrentUser.phone)).toBeTruthy();

      // Verify testIDs are applied correctly
      expect(getByTestId(TEST_IDS.USER_ITEM.NAME)).toBeTruthy();
      expect(getByTestId(TEST_IDS.USER_ITEM.USERNAME)).toBeTruthy();
      expect(getByTestId(TEST_IDS.USER_ITEM.PHONE)).toBeTruthy();
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

      expect(getByText("José María O'Connor")).toBeTruthy();
      expect(getByText('josé_maría123')).toBeTruthy();
      expect(getByText('+34-123-456-789')).toBeTruthy();
    });
  });

  describe('User Interaction', () => {
    it('should call handleNextUserPress when card is pressed', () => {
      const { getByTestId } = render(
        <UserItem currentUser={mockCurrentUser} users={mockUsers} />,
      );

      const card = getByTestId(TEST_IDS.USER_ITEM.CARD);
      fireEvent.press(card);

      expect(mockHandleNextUserPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Hook Integration', () => {
    it('should pass correct parameters to useUserDetailsNavigation hook', () => {
      render(<UserItem currentUser={mockCurrentUser} users={mockUsers} />);

      expect(useUserDetailsNavigationMock).toHaveBeenCalledWith(
        mockUsers,
        mockCurrentUser,
      );
      expect(useUserDetailsNavigationMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Validation', () => {
    it('should handle different user array lengths', () => {
      const singleUserArray = [mockCurrentUser];

      const { getByTestId } = render(
        <UserItem currentUser={mockCurrentUser} users={singleUserArray} />,
      );

      expect(getByTestId(TEST_IDS.USER_ITEM.CARD)).toBeTruthy();
      expect(useUserDetailsNavigationMock).toHaveBeenCalledWith(
        singleUserArray,
        mockCurrentUser,
      );
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
        `${mockCurrentUser.name}, username: ${mockCurrentUser.username}, phone: ${mockCurrentUser.phone}`,
      );
    });
  });
});
