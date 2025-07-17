import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { Strings, TEST_IDS } from '@shared/constants';

import ErrorFallback from '.';

describe('ErrorFallback', () => {
  const mockResetError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render error message', () => {
    const { getByTestId } = render(
      <ErrorFallback resetError={mockResetError} />,
    );
    expect(
      getByTestId(TEST_IDS.ERROR_BOUNDARY.ERROR_MESSAGE).props.children,
    ).toBe(Strings.errorBoundary.message);
  });

  it('should call resetError when retry button is pressed', () => {
    const { getByTestId } = render(
      <ErrorFallback resetError={mockResetError} />,
    );
    fireEvent.press(getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON));
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });

  it('should all important testIDs are present', () => {
    const { getByTestId } = render(
      <ErrorFallback resetError={mockResetError} />,
    );

    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.CONTAINER)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.TITLE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.ERROR_MESSAGE)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON)).toBeTruthy();
    expect(getByTestId(TEST_IDS.ERROR_BOUNDARY.RETRY_BUTTON_TEXT)).toBeTruthy();
  });
});
