import { API_BASE_URL } from '@env';
import axios from 'axios';

import { mockUsers } from '@shared/test-utils/mockHelpers';

import { fetchUsers } from '.';

jest.mock('axios');
const mockedAxiosGet = axios.get as jest.Mock;

describe('fetchUsers', () => {
  it('should return user data successfully', async () => {
    mockedAxiosGet.mockResolvedValue({ data: mockUsers });
    const users = await fetchUsers();
    expect(mockedAxiosGet).toHaveBeenCalledWith(`${API_BASE_URL}/users`);
    expect(users).toEqual(mockUsers);
  });
  it('should return error when fetch user data unsuccessfully', async () => {
    const errorMessage = 'Network Error';
    mockedAxiosGet.mockRejectedValue(new Error(errorMessage));
    await expect(fetchUsers()).rejects.toThrow(errorMessage);
    expect(mockedAxiosGet).toHaveBeenCalledWith(`${API_BASE_URL}/users`);
  });
});
