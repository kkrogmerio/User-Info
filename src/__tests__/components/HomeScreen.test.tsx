import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import HomeScreen from '../../screens/HomeScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/rootStack';
import SCREENS from '../../navigation/screenNames';
import {RouteProp} from '@react-navigation/native';
import Strings from '../../constants/strings';
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as unknown as NativeStackNavigationProp<RootStackParamList, SCREENS.Home>;

const mockRoute: RouteProp<RootStackParamList, SCREENS.Home> = {
  key: 'Home',
  name: SCREENS.Home,
};

const queryClient = new QueryClient();

describe('HomeScreen', () => {
  it('renders loading state correctly', () => {
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      isLoading: true,
      data: null,
      error: null,
    }));

    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </QueryClientProvider>,
    );

    expect(getByText(Strings.loading)).toBeTruthy();
  });

  it('renders users correctly', async () => {
    const users = [{id: 1, name: 'John Doe'}];
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      isLoading: false,
      data: users,
      error: null,
    }));

    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });
  });
  it('shows a message when there are no users', async () => {
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      isLoading: false,
      data: [],
      error: null,
    }));

    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText('No available users')).toBeTruthy();
    });
  });
  it('displays error message when there is an error', () => {
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      isLoading: false,
      data: null,
      error: {message: Strings.errorFetching},
    }));

    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </QueryClientProvider>,
    );

    expect(getByText(Strings.errorFetching)).toBeTruthy();
  });
});
