import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from './src/navigation/AppNavigator';
import { queryClient } from './src/shared/services';
import { enableQueryPersistence } from './src/shared/services/queryClient';

const App: React.FC = () => {
  enableQueryPersistence();
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
