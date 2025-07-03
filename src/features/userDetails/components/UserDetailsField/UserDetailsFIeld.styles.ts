import { Colors } from '@shared/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primaryTextColor,
    marginVertical: 4,
    marginRight: 4,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.secondaryTextColor,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
