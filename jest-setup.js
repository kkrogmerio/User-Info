import '@testing-library/jest-dom';
import '@testing-library/jest-native/extend-expect';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-community/netinfo', () => {
  return {
    useNetInfo: jest.fn(() => ({
      isConnected: true,
    })),
  };
});
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
