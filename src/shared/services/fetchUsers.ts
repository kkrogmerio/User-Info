import { API_BASE_URL } from '@env';
import axios from 'axios';

import { User } from '@shared/types';
export const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return data;
};
