import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { ACCESSIBILITY_HINTS, Strings, TEST_IDS } from '@shared/constants';

import ErrorFallback from '.';

describe('ErrorFallback', () => {
  const mockResetError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with error message from props', () => {
    const TEST_ERROR = 'Test error';
    const error = new Error(TEST_ERROR);
    const { getByTestId } = render(
      <ErrorFallback error={error} resetError={mockResetError} />,
    );
    expect(
      getByTestId(TEST_IDS.ERROR_BOUNDARY.ERROR_MESSAGE).props.children,
    ).toBe(TEST_ERROR);
  });

  it('should render with default error message if error is null', () => {
    const { getByTestId } = render(
      <ErrorFallback error={null} resetError={mockResetError} />,
    );
    expect(
      getByTestId(TEST_IDS.ERROR_BOUNDARY.ERROR_MESSAGE).props.children,
    ).toBe(Strings.errorBoundary.message);
  });

  it('should call resetError when retry button is pressed', () => {
    const { getByTestId } = render(
      <ErrorFallback error={null} resetError={mockResetError} />,
    );
    fireEvent.press(getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON));
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });

  it('should all important testIDs are present', () => {
    const { getByTestId } = render(
      <ErrorFallback error={null} resetError={mockResetError} />,
    );

    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.CONTAINER)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.TITLE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.ERROR_MESSAGE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON_TEXT)).toBeTruthy();
  });
  it('should set accessibilityHint on retry button', () => {
    const { getByTestId } = render(
      <ErrorFallback error={null} resetError={mockResetError} />,
    );

    const retryButton = getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON);
    expect(retryButton.props.accessibilityHint).toBe(
      ACCESSIBILITY_HINTS.REDIRECTED_TO_ERROR_BOUNDARY_PAGE,
    );
  });
});
