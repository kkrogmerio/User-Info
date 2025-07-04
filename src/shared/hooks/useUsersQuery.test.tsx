import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNetInfo } from '@react-native-community/netinfo';
import { fetchUsers } from '../services/fetchUsers';
import { useUsersQuery } from './useUsersQuery';
import { mockUsers } from '../test-utils/mockHelpers';

jest.mock('../services/fetchUsers');
jest.mock('@react-native-community/netinfo');

const mockedFetchUsers = fetchUsers as jest.Mock;
const mockedUseNetInfo = useNetInfo as jest.Mock;
let queryClient: QueryClient;
const createWrapper = () => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: React.PropsWithChildren<{}>) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUsersQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    queryClient.clear(); 
  });

  it('should fetch users when network is connected', async () => {
    mockedFetchUsers.mockResolvedValue(mockUsers);
    mockedUseNetInfo.mockReturnValue({ isConnected: true });

    const { result } = renderHook(() => useUsersQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockUsers);
  });

  it('should NOT fetch users when network is disconnected and be in pending', async () => {
    mockedUseNetInfo.mockReturnValue({ isConnected: false });

    const { result } = renderHook(() => useUsersQuery(), {
      wrapper: createWrapper(),
    });

    expect(fetchUsers).not.toHaveBeenCalled();
    expect(result.current.status).toEqual('pending');
  });

  it('should handle errors from fetchUsers', async () => {
    const API_ERROR = 'API ERROR';
    mockedFetchUsers.mockRejectedValue(new Error(API_ERROR));
    mockedUseNetInfo.mockReturnValue({ isConnected: true });

    const { result } = renderHook(() => useUsersQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(fetchUsers).toHaveBeenCalled();
    expect(result.current.error).toEqual(new Error(API_ERROR));
  });
});
