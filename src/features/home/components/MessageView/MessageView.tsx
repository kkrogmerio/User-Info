import React from 'react';
import {View, Text} from 'react-native';
import styles from './MessageView.style';
interface Props {
  message: string;
  testID?: string;
}
const MessageView: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.loadingOrErrorView}>
      <Text>{message}</Text>
    </View>
  );
};
export default MessageView;
