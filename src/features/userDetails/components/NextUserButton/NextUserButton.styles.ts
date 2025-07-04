import { StyleSheet } from 'react-native';

import { Colors } from '@shared/constants';
const styles = StyleSheet.create({
  screenView: { padding: 12 },
  nextUser: { fontWeight: 'bold', color: Colors.secondaryTextColor },
  nextUserLayout: { width: '100%', flexDirection: 'row-reverse' },
});
export default styles;
