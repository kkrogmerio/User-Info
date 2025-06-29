import React from 'react';
import {View, Text} from 'react-native';
import styles from './MessageView.style';
import {Strings} from '../../../../constants';
interface Props {
  message: string;
}
const MessageView: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.loadingOrErrorView}>
      <Text>{message}</Text>
    </View>
  );
};
export default MessageView;
