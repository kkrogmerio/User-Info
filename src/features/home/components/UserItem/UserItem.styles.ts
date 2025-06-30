import {Colors} from '../../../../constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: '2.5%',
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    width: '45%',
    height: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignSelf: 'center',
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
  phone: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondaryTextColor,
  },
});

export default styles;
