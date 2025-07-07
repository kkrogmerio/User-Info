import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
export const reactQueryStoreCache = 'reactQueryStoreCache';
// Create query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Create async storage persister
const asyncStoragePersistor = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: reactQueryStoreCache,
});

// Persist query client
export function enableQueryPersistence() {
  persistQueryClient({
    queryClient,
    persister: asyncStoragePersistor,
    maxAge: Infinity,
  });
}
