import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {User} from '../../../../types/user';
import {styles} from './index';
import useUserDetailsNavigation from '../../../../hooks/useUserDetailsNavigation';
type UserItemProps = {
  currentUser: User;
  users: User[];
};

const UserItem: React.FC<UserItemProps> = ({currentUser, users}) => {
  const {handleNextUserPress} = useUserDetailsNavigation(users, currentUser);
  return (
    <TouchableOpacity onPress={handleNextUserPress} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.contentLayout}>
          <Text style={styles.name}>{currentUser.name}</Text>
        </View>
        <View style={styles.contentLayout}>
          <Text style={styles.username}>{currentUser.username}</Text>
        </View>
        <View style={styles.contentLayout}>
          <Text style={styles.phone}>{currentUser.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;
