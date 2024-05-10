import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDetailsScreen from '../../screens/UserDetailsScreen';

const Stack = createNativeStackNavigator();

describe('UserDetailsScreen', () => {
  it('displays user details', () => {
    const route = {
      params: {
        user: {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          phone: '1234567890',
        },
        users: [],
      },
    };

    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(getByText('Username: johndoe')).toBeTruthy();
  });
});
