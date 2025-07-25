import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@tanstack/react-query';

import { fetchUsers } from '@shared/services';

export const useUsersQuery = () => {
  const netInfo = useNetInfo();
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !!netInfo.isConnected,
  });
};
