import React from 'react';

import { render } from '@testing-library/react-native';

import { ACCESSIBILITY_ROLES, Strings, TEST_IDS } from '@shared/constants';
import { useUsersQuery } from '@shared/hooks';
import { mockProps, mockUsers } from '@shared/test-utils/mockHelpers';
import { User } from '@shared/types';

import { ListUsersScreen } from '.';

jest.mock('@shared/hooks');

jest.mock('../components/MessageView', () => {
  const { View, Text } = require('react-native');

  return {
    MessageView: ({ message, testID }: { message: string; testID: string }) => (
      <View testID={testID}>
        <Text>{message}</Text>
      </View>
    ),
  };
});

jest.mock('../components/UserList', () => {
  const { View } = require('react-native');

  return {
    UsersList: ({ data, testID }: { data: User[]; testID: string }) => (
      <View testID={testID}>
        {data.map(user => (
          <View key={user.id} testID={`user-${user.id}`} />
        ))}
      </View>
    ),
  };
});

jest.mock('../components/UserList', () => {
  const { View } = require('react-native');

  return {
    UsersList: ({ data, testID }: { data: User[]; testID: string }) => (
      <View testID={testID}>
        {data.map(user => (
          <View key={user.id} testID={`user-${user.id}`} />
        ))}
      </View>
    ),
  };
});

const mockUseUsersQuery = useUsersQuery as jest.MockedFunction<
  typeof useUsersQuery
>;

//Create mock only for property used in ListUsersScreen.tsx by the useUsersQuery hook (data,isLoading and error)
const createMockQueryResult = (
  data: User[] | undefined,
  isLoading: boolean,
  error: Error | null,
) =>
  ({
    data,
    isLoading,
    error,
  } as ReturnType<typeof useUsersQuery>);

describe('ListUsersScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading message when loading', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(undefined, true, null),
    );

    const { getByTestId, getByText } = render(
      <ListUsersScreen {...mockProps} />,
    );

    expect(getByTestId(TEST_IDS.LIST_USERS.LOADING_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.fetchDataStatus.loading)).toBeTruthy();
  });

  it('should show error message when there is an error', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(
        undefined,
        false,
        new Error('Something went wrong'),
      ),
    );

    const { getByTestId, getByText } = render(
      <ListUsersScreen {...mockProps} />,
    );

    expect(getByTestId(TEST_IDS.LIST_USERS.ERROR_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.fetchDataStatus.errorFetching)).toBeTruthy();
  });

  it('should show no users message when data is empty', () => {
    mockUseUsersQuery.mockReturnValue(createMockQueryResult([], false, null));

    const { getByTestId, getByText } = render(
      <ListUsersScreen {...mockProps} />,
    );

    expect(getByTestId(TEST_IDS.LIST_USERS.NO_USERS_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.noUsers)).toBeTruthy();
  });

  it('should show no users message when data is undefined', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(undefined, false, null),
    );

    const { getByTestId, getByText } = render(
      <ListUsersScreen {...mockProps} />,
    );

    expect(getByTestId(TEST_IDS.LIST_USERS.NO_USERS_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.noUsers)).toBeTruthy();
  });

  it('should render users list when data is available', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(mockUsers, false, null),
    );

    const { getByTestId } = render(<ListUsersScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.LIST_USERS.CONTAINER)).toBeTruthy();
    expect(getByTestId(TEST_IDS.LIST_USERS.TITLE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.USERS_LIST)).toBeTruthy();
  });

  it('should pass correct data to UsersList', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(mockUsers, false, null),
    );

    const { getByTestId } = render(<ListUsersScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.USERS_LIST)).toBeTruthy();
    expect(getByTestId(`user-${mockUsers[0].id}`)).toBeTruthy();
    expect(getByTestId(`user-${mockUsers[1].id}`)).toBeTruthy();
    expect(getByTestId(`user-${mockUsers[2].id}`)).toBeTruthy();
  });

  it('should display correct title text, along with its header accessibility role', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(mockUsers, false, null),
    );

    const { getByTestId } = render(<ListUsersScreen {...mockProps} />);
    const title = getByTestId(TEST_IDS.LIST_USERS.TITLE);
    expect(title).toBeTruthy();
    expect(title.props.accessibilityRole).toBe(ACCESSIBILITY_ROLES.HEADER);
  });
});
