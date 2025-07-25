import React from 'react';

import { render } from '@testing-library/react-native';

import { TEST_IDS, ACCESSIBILITY_ROLES } from '@shared/constants';
import { mockUsers } from '@shared/test-utils/mockHelpers';
import { User } from '@shared/types';

import { UsersList } from '.';

// Mock the UserItem component
jest.mock('../UserItem/index', () => {
  const { View, Text } = require('react-native');

  return {
    UserItem: ({
      currentUser,
      testID,
    }: {
      currentUser: User;
      testID: string;
    }) => (
      <View testID={testID}>
        <Text>{currentUser.name}</Text>
      </View>
    ),
  };
});
describe('UsersList', () => {
  it('should render the list properly', () => {
    const { getByTestId } = render(<UsersList data={mockUsers} />);

    expect(getByTestId(`${TEST_IDS.USERS_LIST}`)).toBeTruthy();
  });

  it('should set accessibilityRole "list" on the list of users', () => {
    const { getByTestId } = render(<UsersList data={mockUsers} />);
    const flatList = getByTestId(TEST_IDS.USERS_LIST);
    expect(flatList.props.accessibilityRole).toBe(ACCESSIBILITY_ROLES.LIST);
  });

  it('should show all users', () => {
    const { getByTestId } = render(<UsersList data={mockUsers} />);

    expect(getByTestId(`user-item-${mockUsers[0].id}`)).toBeTruthy();
    expect(getByTestId(`user-item-${mockUsers[1].id}`)).toBeTruthy();
    expect(getByTestId(`user-item-${mockUsers[2].id}`)).toBeTruthy();
  });

  it('should render single user', () => {
    const onlyFirstUser = [mockUsers[0]];
    const { getByTestId, getByText } = render(
      <UsersList data={onlyFirstUser} />,
    );

    expect(
      getByTestId(`${TEST_IDS.USER_ITEM.ITEM}-${mockUsers[0].id}`),
    ).toBeTruthy();
    expect(getByText(mockUsers[0].name)).toBeTruthy();
  });

  it('should create correct testIDs for each user', () => {
    const { getByTestId } = render(<UsersList data={mockUsers} />);

    // Check that testIDs follow the pattern
    mockUsers.forEach(user => {
      expect(getByTestId(`${TEST_IDS.USER_ITEM.ITEM}-${user.id}`)).toBeTruthy();
    });
  });
});
