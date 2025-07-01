import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNetInfo } from '@react-native-community/netinfo';
import { User } from '@/types/user';

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users',
  );
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
