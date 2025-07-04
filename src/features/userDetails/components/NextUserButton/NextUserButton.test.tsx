import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { TEST_IDS, ACCESSIBILITY_ROLES, Strings } from '@shared/constants';

import NextUserButton from './NextUserButton';

describe('NextUserButton', () => {
  const label = Strings.nextUser;
  const onPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button with the correct label', () => {
    const { getByTestId } = render(
      <NextUserButton label={label} onPress={onPress} />,
    );
    const labelText = getByTestId(TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_TEXT);
    expect(labelText.props.children).toBe(label);
  });

  it('should have accessibilityRole set to BUTTON', () => {
    const { getByTestId } = render(
      <NextUserButton label={label} onPress={onPress} />,
    );
    const button = getByTestId(TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON);
    expect(button.props.accessibilityRole).toBe(ACCESSIBILITY_ROLES.BUTTON);
  });

  it('should call onPress when pressed', () => {
    const { getByTestId } = render(
      <NextUserButton label={label} onPress={onPress} />,
    );
    fireEvent.press(getByTestId(TEST_IDS.USER_DETAILS_SCREEN.NEXT_USER_BUTTON));
    expect(onPress).toHaveBeenCalled();
  });
});
