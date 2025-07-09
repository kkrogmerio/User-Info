import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';

import App from './App';
import AppNavigator from './src/navigation/AppNavigator';
import { queryClient } from './src/shared/services';
import { enableQueryPersistence } from './src/shared/services/queryClient';

jest.mock('./src/navigation/AppNavigator', () => {
  return jest.fn();
});

jest.mock('./src/shared/services', () => ({
  queryClient: {},
}));

jest.mock('./src/shared/services/queryClient', () => ({
  enableQueryPersistence: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: jest.fn(({ children }) => <>{children}</>),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AppNavigator component', () => {
    render(<App />);
    expect(AppNavigator).toHaveBeenCalledTimes(1);
  });

  it('should call enableQueryPersistence on mount', () => {
    render(<App />);
    expect(enableQueryPersistence).toHaveBeenCalledTimes(1);
  });

  it('should wrap AppNavigator with QueryClientProvider', () => {
    render(<App />);
    //expect.anything() refers to the children wrapped inside QueryCLientProvider, its irelevant foe this test case so we can set to expect anything
    expect(QueryClientProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        client: queryClient,
      }),
      expect.anything(),
    );
  });
});
