import React, { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/services';
import AppNavigator from '@navigation/AppNavigator';
import { enableQueryPersistence } from '@shared/services/queryClient';

const App: React.FC = () => {
  useEffect(() => {
    enableQueryPersistence();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
