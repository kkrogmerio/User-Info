/* global jest */
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
// React Navigation calls the icon function multiple times during the rendering process to handle different icon states (focused/unfocused).
// https://github.com/react-navigation/react-navigation/issues/546
const originalConsoleError = console.error;

console.error = (...args) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (
    message.includes(
      'Warning: An update to Animated(View) inside a test was not wrapped in act',
    ) ||
    message.includes('act(...)') ||
    message.includes('Animated(View)') ||
    (message.includes('shouldThrow') && message.includes('ErrorBoundary'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};
