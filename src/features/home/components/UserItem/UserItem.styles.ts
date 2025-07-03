import { Colors } from '@shared/constants';
import { StyleSheet } from 'react-native';
export const ITEM_HEIGHT = 120;
export const ITEM_MARGIN_VERTICAL = 9;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: ITEM_MARGIN_VERTICAL,
    marginHorizontal: '2.5%',
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    width: '45%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignSelf: 'center',
    height: ITEM_HEIGHT,
  },
  cardContent: {
    margin: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: Colors.secondaryTextColor,
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryTextColor,
  },
});

export default styles;
