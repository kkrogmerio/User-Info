import {Colors} from '@constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  screenView: {marginHorizontal: 10},
  username: {fontWeight: 'bold', fontSize: 16, color: Colors.primaryTextColor},
  nextUser: {fontWeight: 'bold', color: Colors.secondaryTextColor},
  nextUserLayout: {width: '100%', flexDirection: 'row-reverse'},
});
export default styles;
