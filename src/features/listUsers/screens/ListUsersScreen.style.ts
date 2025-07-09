import { StyleSheet } from 'react-native';

import { Colors } from '@shared/constants';
const styles = StyleSheet.create({
  screenView: { flex: 1, width: '100%', height: '100%', marginTop: 30 },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: Colors.primaryTextColor,
  },
});
export default styles;
