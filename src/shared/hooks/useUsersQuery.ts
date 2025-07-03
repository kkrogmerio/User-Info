import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNetInfo } from '@react-native-community/netinfo';
import { User } from '@shared/types/user';
import { API_BASE_URL } from '@env';

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return data;
};

export const useUsersQuery = () => {
  const netInfo = useNetInfo();
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !!netInfo.isConnected,
  });
};
