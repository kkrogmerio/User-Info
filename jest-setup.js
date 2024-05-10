import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-dom';  // Or import from 'jest-extended'
import '@testing-library/jest-native/extend-expect'; // Ensure this is imported after jest-dom

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-community/netinfo', () => {
    return {
      useNetInfo: jest.fn(() => ({
        isConnected: true, // Set default connection status or customize as needed
        // ... you can add more properties as needed for your testing
      })), 
    };
  });
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Mock any other native modules or specific components here
