import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from './src/navigation/AppNavigator';
import { queryClient } from './src/shared/services';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
