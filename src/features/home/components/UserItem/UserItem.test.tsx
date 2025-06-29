import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserItem from './UserItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../types/rootStack';
import SCREENS from '../../../../navigation/screenNames';
import {User} from '../../../../types/user';

describe('UserItem', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as NativeStackNavigationProp<RootStackParamList, SCREENS.Home>;

  const user: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    phone: '123-456-7890',
  };

  const otherUser: User = {
    id: 2,
    name: 'Jane Doe',
    username: 'janedoe',
    phone: '987-654-3210',
  };

  const users: User[] = [user, otherUser];

  it('shows only the user details and not others', () => {
    const {getByText, queryByText} = render(
      <UserItem currentUser={user} users={users} />,
    );

    // Check if user details are shown
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('johndoe')).toBeTruthy();
    expect(getByText('123-456-7890')).toBeTruthy();

    // Check if other user details are not shown
    expect(queryByText('Jane Doe')).toBeNull();
    expect(queryByText('janedoe')).toBeNull();
    expect(queryByText('987-654-3210')).toBeNull();
  });

  it('navigates to UserDetails screen with correct parameters when pressed', () => {
    const {getByText} = render(<UserItem currentUser={user} users={users} />);

    fireEvent.press(getByText('John Doe'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.UserDetails, {
      user,
      users,
    });
  });
});
