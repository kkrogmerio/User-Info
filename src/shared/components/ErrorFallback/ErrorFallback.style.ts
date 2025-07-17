import { Platform, StyleSheet } from 'react-native';

import { Colors } from '@/shared/constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primaryTextColor,
  },
  error: {
    fontSize: 14,
    color: Colors.errorRed,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Platform.select({
      ios: Colors.white,
      android: Colors.blue,
    }),
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Platform.select({ ios: Colors.blue, android: Colors.white }),
    fontSize: 16,
  },
});
export default styles;
