jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@tanstack/query-async-storage-persister', () => ({
  createAsyncStoragePersister: jest.fn(),
}));

jest.mock('@tanstack/react-query-persist-client', () => ({
  persistQueryClient: jest.fn(),
}));

describe('queryClient', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  it('should export a QueryClient instance', () => {
    const { queryClient } = require('./queryClient');
    const { QueryClient } = require('@tanstack/react-query');
    expect(queryClient).toBeInstanceOf(QueryClient);
  });

  it('should have 5 minute staleTime for queries', () => {
    const { queryClient } = require('./queryClient');
    const options = queryClient.getDefaultOptions();
    expect(options.queries?.staleTime).toBe(5 * 60 * 1000);
  });
  it('should create async storage persister with correct config', () => {
    const { reactQueryStoreCache } = require('./queryClient');
    const {
      createAsyncStoragePersister,
    } = require('@tanstack/query-async-storage-persister');
    expect(createAsyncStoragePersister).toHaveBeenCalledWith(
      expect.objectContaining({
        key: reactQueryStoreCache,
      }),
    );
  });

  it('should persist query client with correct settings', () => {
    jest.resetModules();
    const { queryClient } = require('./queryClient');
    const {
      persistQueryClient,
    } = require('@tanstack/react-query-persist-client');
    expect(persistQueryClient).toHaveBeenCalledWith(
      expect.objectContaining({
        queryClient,
        maxAge: Infinity,
      }),
    );
  });
});
