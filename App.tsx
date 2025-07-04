import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

import AppNavigator from './src/navigation/AppNavigator';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const asyncStoragePersistor = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'reactQueryCache',
});

persistQueryClient({
  queryClient,
  persister: asyncStoragePersistor,
  maxAge: Infinity,
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
