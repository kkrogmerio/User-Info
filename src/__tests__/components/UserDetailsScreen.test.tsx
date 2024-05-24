import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDetailsScreen from '../../screens/UserDetailsScreen';
import Strings from '../../constants/strings';
import {Alert} from 'react-native';
import {RootStackParamList} from '../../types/rootStack';
import SCREENS from '../../navigation/screenNames';
const Stack = createNativeStackNavigator<RootStackParamList>();

describe('UserDetailsScreen', () => {
  it('displays user details', () => {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        phone: '1234567890',
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        phone: '0987654321',
      },
    ];

    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={SCREENS.UserDetails}
            component={UserDetailsScreen}
            initialParams={{user: users[0], users}}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(getByText(Strings.username + ' johndoe')).toBeTruthy();

    fireEvent.press(getByText(Strings.nextUser));

    expect(getByText(Strings.username + ' janesmith')).toBeTruthy();
  });

  it('displays alert when there are no more users', () => {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        phone: '1234567890',
      },
    ];
    Alert.alert = jest.fn();

    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={SCREENS.UserDetails}
            component={UserDetailsScreen}
            initialParams={{user: users[0], users}}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    fireEvent.press(getByText(Strings.nextUser));
    expect(Alert.alert).toHaveBeenCalledWith(Strings.errorNoMoreUsers);
  });
});
