import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
const styles = StyleSheet.create({
  contentContainerPadding: { paddingBottom: 100 },
  loadingOrErrorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
