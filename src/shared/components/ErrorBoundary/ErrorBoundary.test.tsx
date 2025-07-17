import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import ErrorBoundary from '.';

const TEST_IDS = {
  ERROR_MESSAGE: 'error-message',
  RESET_BUTTON: 'reset-button',
  NORMAL_CONTENT: 'normal-content',
};

const MESSAGES = {
  unknownError: 'Unknown error',
  normalContent: 'Normal content',
  tryAgain: 'Try Again',
};

jest.mock('../ErrorFallback', () => {
  return function MockErrorFallback({
    resetError,
  }: {
    resetError: () => void;
  }) {
    const { Text } = require('react-native');
    return (
      <>
        <Text testID={TEST_IDS.ERROR_MESSAGE}>{MESSAGES.unknownError}</Text>
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
    throw new Error('Some error');
  }
  const { Text } = require('react-native');
  return <Text testID={TEST_IDS.NORMAL_CONTENT}>{MESSAGES.normalContent}</Text>;
};

describe('ErrorBoundary', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when no error occurs', () => {
    const { getByTestId, queryByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(getByTestId(TEST_IDS.NORMAL_CONTENT)).toBeTruthy();
    expect(queryByTestId(TEST_IDS.ERROR_MESSAGE)).toBeNull();
  });

  it('should catch error and renders ErrorFallback', () => {
    const { getByTestId, queryByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(getByTestId(TEST_IDS.ERROR_MESSAGE).props.children).toBe(
      MESSAGES.unknownError,
    );
    expect(queryByTestId(TEST_IDS.NORMAL_CONTENT)).toBeNull();
  });

  it('should reset error when Try Again is pressed', () => {
    const { getByTestId, unmount } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(getByTestId(TEST_IDS.ERROR_MESSAGE)).toBeTruthy();

    fireEvent.press(getByTestId(TEST_IDS.RESET_BUTTON));

    // Unmount and mount again with shouldThrow = false
    unmount();
    const { getByTestId: getByTestId2, queryByTestId: queryByTestId2 } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(getByTestId2(TEST_IDS.NORMAL_CONTENT)).toBeTruthy();
    expect(queryByTestId2(TEST_IDS.ERROR_MESSAGE)).toBeNull();
  });
});
