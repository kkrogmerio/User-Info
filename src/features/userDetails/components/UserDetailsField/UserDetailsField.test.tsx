import React from 'react';
import { render } from '@testing-library/react-native';
import { UserDetailField } from '.';
import { ACCESSIBILITY_ROLES, Strings, TEST_IDS } from '@/constants';

describe('UserDetailField', () => {
  const label = Strings.user.email;
  const value = 'alice@example.com';
  const testLabelID = TEST_IDS.USER_ITEM.EMAIL;
  const testValueID = TEST_IDS.USER_ITEM.EMAIL_VALUE;

  it('should render label and value with correct text and testIDs', () => {
    const { getByTestId } = render(
      <UserDetailField
        label={label}
        value={value}
        testLabelID={testLabelID}
        testValueID={testValueID}
      />,
    );
    expect(getByTestId(testLabelID).props.children).toBe(label);
    expect(getByTestId(testValueID).props.children).toBe(value);
  });

  it('should set accessibilityRole=TEXT on the label', () => {
    const { getByTestId } = render(
      <UserDetailField
        label={label}
        value={value}
        testLabelID={testLabelID}
        testValueID={testValueID}
      />,
    );
    expect(getByTestId(testLabelID).props.accessibilityRole).toBe(
      ACCESSIBILITY_ROLES.TEXT,
    );
  });

  it('should render label and value even if testIDs are not provided', () => {
    const { getByText } = render(
      <UserDetailField label={label} value={value} />,
    );
    expect(getByText(label)).toBeTruthy();
    expect(getByText(value)).toBeTruthy();
  });
});
