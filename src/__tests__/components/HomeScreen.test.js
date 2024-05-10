import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import HomeScreen from '../../screens/HomeScreen';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

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
        <HomeScreen />
      </QueryClientProvider>,
    );

    expect(getByText('Loading...')).toBeTruthy();
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
        <HomeScreen />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });
  });

  it('displays error message when there is an error', () => {
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      isLoading: false,
      data: null,
      error: {message: 'An error occurred'},
    }));

    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>,
    );

    expect(getByText('An error occurred')).toBeTruthy();
  });
});
