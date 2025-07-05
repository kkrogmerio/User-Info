import React, { memo } from 'react';

import { View, Text } from 'react-native';

import { ACCESSIBILITY_ROLES } from '@shared/constants';

import styles from './MessageView.style';
interface Props {
  message: string;
  testID?: string;
}
const MessageView: React.FC<Props> = memo(({ message }) => {
  return (
    <View style={styles.loadingOrErrorView}>
      <Text accessibilityRole={ACCESSIBILITY_ROLES.TEXT}>{message}</Text>
    </View>
  );
});
export default MessageView;
