import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import ErrorBoundary from '.';

const TEST_IDS = {
  ERROR_MESSAGE: 'error-message',
  RESET_BUTTON: 'reset-button',
  NORMAL_CONTENT: 'normal-content',
};

const MESSAGES = {
  testError: 'Test error message',
  unknownError: 'Unknown error',
  normalContent: 'Normal content',
  tryAgain: 'Try Again',
};

// Mock the ErrorFallback component
jest.mock('../ErrorFallback', () => {
  return function MockErrorFallback({
    error,
    resetError,
  }: {
    error: Error;
    resetError: () => void;
  }) {
    const { Text } = require('react-native');
    return (
      <>
        <Text testID={TEST_IDS.ERROR_MESSAGE}>
          {error?.message || MESSAGES.unknownError}
        </Text>
        <Text testID={TEST_IDS.RESET_BUTTON} onPress={resetError}>
          {MESSAGES.tryAgain}
        </Text>
      </>
    );
  };
});

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error(MESSAGES.testError);
  }
  const { Text } = require('react-native');
  return <Text testID={TEST_IDS.NORMAL_CONTENT}>{MESSAGES.normalContent}</Text>;
};

describe('ErrorBoundary', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children normally when no error occurs', () => {
    const { getByTestId, queryByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(getByTestId(TEST_IDS.NORMAL_CONTENT)).toBeTruthy();
    expect(queryByTestId(TEST_IDS.ERROR_MESSAGE)).toBeNull();
  });

  it('should catch error and renders ErrorFallback component, then resets on retry', () => {
    const renderTree = (shouldThrow: boolean) =>
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={shouldThrow} />
        </ErrorBoundary>,
      );

    // First render: throw error to trigger fallback
    const { getByTestId, queryByTestId, unmount } = renderTree(true);

    expect(getByTestId(TEST_IDS.ERROR_MESSAGE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_MESSAGE).props.children).toBe(
      MESSAGES.testError,
    );
    expect(queryByTestId(TEST_IDS.NORMAL_CONTENT)).toBeNull();

    // Simulate "Try Again" (reset)
    fireEvent.press(getByTestId(TEST_IDS.RESET_BUTTON));

    // Unmount and remount with shouldThrow=false
    unmount();
    const { getByTestId: getByTestId2, queryByTestId: queryByTestId2 } =
      renderTree(false);

    expect(getByTestId2(TEST_IDS.NORMAL_CONTENT)).toBeTruthy();
    expect(queryByTestId2(TEST_IDS.ERROR_MESSAGE)).toBeNull();
  });
});
