import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/rootStack';
import {User} from '../types/user';
import SCREENS from '../navigation/screenNames';
import {Colors} from '../constants';
type UserItemProps = {
  user: User;
  navigation: NativeStackNavigationProp<RootStackParamList, SCREENS.Home>;
  users: User[];
};

const UserItem: React.FC<UserItemProps> = ({user, users, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.UserDetails, {user, users})}
      style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.contentLayout}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.contentLayout}>
          <Text style={styles.username}>{user.username}</Text>
        </View>
        <View style={styles.contentLayout}>
          <Text style={styles.phone}>{user.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentLayout: {width: '100%', alignItems: 'center'},
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

export default UserItem;
