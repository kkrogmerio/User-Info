import React, { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/services';
import AppNavigator from '@navigation/AppNavigator';
import { ErrorBoundary } from '@shared/components';
import { enableQueryPersistence } from '@shared/services/queryClient';

const App: React.FC = () => {
  useEffect(() => {
    enableQueryPersistence();
  }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
