import axios from 'axios';
import { fetchUsers } from './fetchUsers';
import { API_BASE_URL } from '@env';
import { mockUsers } from '@shared/test-utils/mockHelpers';

jest.mock('axios');
const mockedAxiosGet = axios.get as jest.Mock;

describe('fetchUsers', () => {
  it('returns user data successfully', async () => {
    mockedAxiosGet.mockResolvedValue({ data: mockUsers });
    const users = await fetchUsers();
    expect(mockedAxiosGet).toHaveBeenCalledWith(`${API_BASE_URL}/users`);
    expect(users).toEqual(mockUsers);
  });
  it('returns user data successfully', async () => {
    const errorMessage = 'Network Error';
    mockedAxiosGet.mockRejectedValue(new Error(errorMessage));
    await expect(fetchUsers()).rejects.toThrow(errorMessage);
    expect(mockedAxiosGet).toHaveBeenCalledWith(`${API_BASE_URL}/users`);
  });
});
