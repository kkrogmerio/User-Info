import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import * as NetInfo from '@react-native-community/netinfo';
import { useUsersQuery } from './useUsersQuery';
import { mockUsers } from '@shared/test-utils/mockHelpers';

jest.mock('axios');
jest.mock('@react-native-community/netinfo');

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

afterEach(() => {
  queryClient.clear();
  jest.clearAllMocks();
});

afterAll(() => {
  queryClient.getQueryCache().clear();
});

describe('useUsersQuery', () => {
  it('should fetch users when online', async () => {
    (NetInfo.useNetInfo as jest.Mock).mockReturnValue({ isConnected: true });
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
    const { result } = renderHook(() => useUsersQuery(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(axios.get).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockUsers);
  });

  it('should not fetch users when offline', async () => {
    (NetInfo.useNetInfo as jest.Mock).mockReturnValue({ isConnected: false });
    const { result } = renderHook(() => useUsersQuery(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(false));
    expect(axios.get).not.toHaveBeenCalled();
  });
});
