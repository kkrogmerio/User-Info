import React from 'react';
import {render} from '@testing-library/react-native';
import {MessageView} from '.';
import {ACCESSIBILITY_ROLES, Strings} from '../../../../constants';

describe('MessageView', () => {
  it('should show the message', () => {
    const {getByText} = render(<MessageView message="Hello world" />);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should work with empty message', () => {
    const {getByText} = render(<MessageView message="" />);
    expect(getByText('')).toBeTruthy();
  });

  it('should update when message changes', () => {
    const {getByText, rerender} = render(<MessageView message="First" />);
    expect(getByText('First')).toBeTruthy();

    rerender(<MessageView message="Second" />);
    expect(getByText('Second')).toBeTruthy();
  });
  it('should set accessibilityRole "text" on the message', () => {
    const message = Strings.loading;
    const {getByText} = render(<MessageView message={message} />);
    const text = getByText(message);

    expect(text.props.accessibilityRole).toBe(ACCESSIBILITY_ROLES.TEXT);
  });
});
