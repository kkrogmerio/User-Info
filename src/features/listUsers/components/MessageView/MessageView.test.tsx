import React from 'react';

import { render } from '@testing-library/react-native';

import { ACCESSIBILITY_ROLES, Strings } from '@shared/constants';

import { MessageView } from '.';

describe('MessageView', () => {
  it('should show the message', () => {
    const { getByText } = render(
      <MessageView message={Strings.fetchDataStatus.loading} />,
    );
    expect(getByText(Strings.fetchDataStatus.loading)).toBeTruthy();
  });

  it('should update when message changes', () => {
    const { getByText, rerender } = render(
      <MessageView message={Strings.fetchDataStatus.loading} />,
    );
    expect(getByText(Strings.fetchDataStatus.loading)).toBeTruthy();

    rerender(
      <MessageView message={Strings.fetchDataStatus.errorNoMoreUsers} />,
    );
    expect(getByText(Strings.fetchDataStatus.errorNoMoreUsers)).toBeTruthy();
  });
  it('should set accessibilityRole "text" on the message', () => {
    const message = Strings.fetchDataStatus.loading;
    const { getByText } = render(<MessageView message={message} />);
    const text = getByText(message);

    expect(text.props.accessibilityRole).toBe(ACCESSIBILITY_ROLES.TEXT);
  });
});
