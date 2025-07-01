import React from 'react';
import {render} from '@testing-library/react-native';
import {HomeScreen} from '.';
import {useUsersQuery} from '@hooks/useUsersQuery';
import {User} from '@/types/user';
import {mockProps, mockUsers} from '@test-utils/mockHelpers';
import {ACCESSIBILITY_ROLES, Strings, TEST_IDS} from '@constants';

jest.mock('@hooks/useUsersQuery');

jest.mock('../components/MessageView', () => {
  const React = require('react');
  const {View, Text} = require('react-native');

  return {
    MessageView: ({message, testID}: {message: string; testID: string}) => (
      <View testID={testID}>
        <Text>{message}</Text>
      </View>
    ),
  };
});

jest.mock('../components/UserList', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    UsersList: ({data, testID}: {data: any[]; testID: string}) => (
      <View testID={testID}>
        {data.map(user => (
          <View key={user.id} testID={`user-${user.id}`} />
        ))}
      </View>
    ),
  };
});

jest.mock('../components/UserList', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    UsersList: ({data, testID}: {data: any[]; testID: string}) => (
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

//Create mock only for property used in HomeScreen.tsx by the useUsersQuery hook (data,isLoading and error)
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

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading message when loading', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(undefined, true, null),
    );

    const {getByTestId, getByText} = render(<HomeScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.HOME_SCREEN.LOADING_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.loading)).toBeTruthy();
  });

  it('should show error message when there is an error', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(
        undefined,
        false,
        new Error('Something went wrong'),
      ),
    );

    const {getByTestId, getByText} = render(<HomeScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.HOME_SCREEN.ERROR_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.errorFetching)).toBeTruthy();
  });

  it('should show no users message when data is empty', () => {
    mockUseUsersQuery.mockReturnValue(createMockQueryResult([], false, null));

    const {getByTestId, getByText} = render(<HomeScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.HOME_SCREEN.NO_USERS_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.noUsers)).toBeTruthy();
  });

  it('should show no users message when data is undefined', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(undefined, false, null),
    );

    const {getByTestId, getByText} = render(<HomeScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.HOME_SCREEN.NO_USERS_MESSAGE)).toBeTruthy();
    expect(getByText(Strings.noUsers)).toBeTruthy();
  });

  it('should render users list when data is available', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(mockUsers, false, null),
    );

    const {getByTestId} = render(<HomeScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.HOME_SCREEN.CONTAINER)).toBeTruthy();
    expect(getByTestId(TEST_IDS.HOME_SCREEN.TITLE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.LIST_USERS)).toBeTruthy();
  });

  it('should pass correct data to UsersList', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(mockUsers, false, null),
    );

    const {getByTestId} = render(<HomeScreen {...mockProps} />);

    expect(getByTestId(TEST_IDS.LIST_USERS)).toBeTruthy();
    expect(getByTestId(`user-${mockUsers[0].id}`)).toBeTruthy();
    expect(getByTestId(`user-${mockUsers[1].id}`)).toBeTruthy();
    expect(getByTestId(`user-${mockUsers[2].id}`)).toBeTruthy();
  });

  it('should display correct title text, along with its header accessibility role', () => {
    mockUseUsersQuery.mockReturnValue(
      createMockQueryResult(mockUsers, false, null),
    );

    const {getByTestId} = render(<HomeScreen {...mockProps} />);
    const title = getByTestId(TEST_IDS.HOME_SCREEN.TITLE);
    expect(title).toBeTruthy();
    expect(title.props.accessibilityRole).toBe(ACCESSIBILITY_ROLES.HEADER);
  });
});
